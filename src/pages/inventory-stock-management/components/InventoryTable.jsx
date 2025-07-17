import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StockStatusBadge from './StockStatusBadge';
import ProductTypeIndicator from './ProductTypeIndicator';

const InventoryTable = ({ products, onEdit, onDelete, onReorder, onBulkAction, selectedItems, onSelectItem, onSelectAll }) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return (
      <Icon 
        name={sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
        size={14} 
        className="text-primary" 
      />
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="p-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedItems.length === products.length}
                  onChange={onSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="p-4 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-2 font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Product</span>
                  <SortIcon field="name" />
                </button>
              </th>
              <th className="p-4 text-left">
                <button
                  onClick={() => handleSort('sku')}
                  className="flex items-center space-x-2 font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>SKU</span>
                  <SortIcon field="sku" />
                </button>
              </th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">
                <button
                  onClick={() => handleSort('quantity')}
                  className="flex items-center space-x-2 font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Stock</span>
                  <SortIcon field="quantity" />
                </button>
              </th>
              <th className="p-4 text-left">
                <button
                  onClick={() => handleSort('price')}
                  className="flex items-center space-x-2 font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Price</span>
                  <SortIcon field="price" />
                </button>
              </th>
              <th className="p-4 text-left">Supplier</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product) => (
              <tr key={product.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(product.id)}
                    onChange={() => onSelectItem(product.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <Icon name="Package" size={20} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{product.name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <ProductTypeIndicator type={product.category} isCustom={product.isCustom} />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-mono text-sm text-muted-foreground">{product.sku}</span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground capitalize">{product.category}</span>
                </td>
                <td className="p-4">
                  <div className="text-sm">
                    <span className="font-medium text-foreground">{product.quantity}</span>
                    <span className="text-muted-foreground"> / {product.reorderPoint}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-medium text-foreground">{formatCurrency(product.price)}</span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">{product.supplier}</span>
                </td>
                <td className="p-4">
                  <StockStatusBadge 
                    status={product.status} 
                    quantity={product.quantity} 
                    reorderPoint={product.reorderPoint} 
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      onClick={() => onEdit(product)}
                    >
                      Edit
                    </Button>
                    {product.quantity <= product.reorderPoint && (
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="ShoppingCart"
                        onClick={() => onReorder(product)}
                      >
                        Reorder
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4 p-4">
        {sortedProducts.map((product) => (
          <div key={product.id} className="bg-surface border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(product.id)}
                  onChange={() => onSelectItem(product.id)}
                  className="rounded border-border"
                />
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <Icon name="Package" size={24} className="text-muted-foreground" />
                </div>
              </div>
              <StockStatusBadge 
                status={product.status} 
                quantity={product.quantity} 
                reorderPoint={product.reorderPoint} 
              />
            </div>
            
            <div className="space-y-2">
              <div>
                <h3 className="font-medium text-foreground">{product.name}</h3>
                <p className="text-sm text-muted-foreground font-mono">{product.sku}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <ProductTypeIndicator type={product.category} isCustom={product.isCustom} />
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Stock:</span>
                  <span className="ml-2 font-medium text-foreground">{product.quantity}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Price:</span>
                  <span className="ml-2 font-medium text-foreground">{formatCurrency(product.price)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Supplier:</span>
                  <span className="ml-2 text-foreground">{product.supplier}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Reorder:</span>
                  <span className="ml-2 text-foreground">{product.reorderPoint}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Edit"
                  onClick={() => onEdit(product)}
                >
                  Edit
                </Button>
                {product.quantity <= product.reorderPoint && (
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="ShoppingCart"
                    onClick={() => onReorder(product)}
                  >
                    Reorder
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryTable;