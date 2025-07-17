import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const InventoryFilters = ({ onFilterChange, onSearch, onAddProduct, selectedCount, onBulkAction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [showBulkActions, setShowBulkActions] = useState(false);

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'frames', label: 'Frames' },
    { value: 'lenses', label: 'Lenses' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'solutions', label: 'Solutions' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'in_stock', label: 'In Stock' },
    { value: 'low_stock', label: 'Low Stock' },
    { value: 'out_of_stock', label: 'Out of Stock' },
    { value: 'discontinued', label: 'Discontinued' },
    { value: 'pending_order', label: 'Pending Order' }
  ];

  const supplierOptions = [
    { value: '', label: 'All Suppliers' },
    { value: 'luxottica', label: 'Luxottica Group' },
    { value: 'essilor', label: 'Essilor International' },
    { value: 'safilo', label: 'Safilo Group' },
    { value: 'marchon', label: 'Marchon Eyewear' },
    { value: 'bausch', label: 'Bausch + Lomb' }
  ];

  const bulkActionOptions = [
    { value: 'update_price', label: 'Update Prices' },
    { value: 'change_category', label: 'Change Category' },
    { value: 'update_supplier', label: 'Update Supplier' },
    { value: 'mark_discontinued', label: 'Mark as Discontinued' },
    { value: 'export_selected', label: 'Export Selected' }
  ];

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (filterType, value) => {
    const filters = {
      category: selectedCategory,
      status: selectedStatus,
      supplier: selectedSupplier,
      [filterType]: value
    };

    switch (filterType) {
      case 'category':
        setSelectedCategory(value);
        break;
      case 'status':
        setSelectedStatus(value);
        break;
      case 'supplier':
        setSelectedSupplier(value);
        break;
    }

    onFilterChange(filters);
  };

  const handleBulkAction = (action) => {
    onBulkAction(action);
    setShowBulkActions(false);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedStatus('');
    setSelectedSupplier('');
    setSearchTerm('');
    onFilterChange({});
    onSearch('');
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-4">
      {/* Search and Add Product */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <Input
            type="search"
            placeholder="Search products, SKU, or supplier..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            iconName="Download"
            onClick={() => onBulkAction('export_all')}
          >
            Export
          </Button>
          <Button
            variant="default"
            iconName="Plus"
            onClick={onAddProduct}
          >
            Add Product
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          placeholder="Filter by category"
          options={categoryOptions}
          value={selectedCategory}
          onChange={(value) => handleFilterChange('category', value)}
        />
        <Select
          placeholder="Filter by status"
          options={statusOptions}
          value={selectedStatus}
          onChange={(value) => handleFilterChange('status', value)}
        />
        <Select
          placeholder="Filter by supplier"
          options={supplierOptions}
          value={selectedSupplier}
          onChange={(value) => handleFilterChange('supplier', value)}
        />
      </div>

      {/* Active Filters and Clear */}
      {(selectedCategory || selectedStatus || selectedSupplier || searchTerm) && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {selectedCategory && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">
                Category: {categoryOptions.find(opt => opt.value === selectedCategory)?.label}
              </span>
            )}
            {selectedStatus && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">
                Status: {statusOptions.find(opt => opt.value === selectedStatus)?.label}
              </span>
            )}
            {selectedSupplier && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">
                Supplier: {supplierOptions.find(opt => opt.value === selectedSupplier)?.label}
              </span>
            )}
            {searchTerm && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">
                Search: "{searchTerm}"
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={clearFilters}
          >
            Clear All
          </Button>
        </div>
      )}

      {/* Bulk Actions */}
      {selectedCount > 0 && (
        <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
          <span className="text-sm font-medium text-primary">
            {selectedCount} item{selectedCount > 1 ? 's' : ''} selected
          </span>
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              iconName="MoreHorizontal"
              onClick={() => setShowBulkActions(!showBulkActions)}
            >
              Bulk Actions
            </Button>
            {showBulkActions && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-modal z-dropdown">
                {bulkActionOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleBulkAction(option.value)}
                    className="w-full text-left px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Click outside handler for bulk actions */}
      {showBulkActions && (
        <div 
          className="fixed inset-0 z-[999]" 
          onClick={() => setShowBulkActions(false)}
        />
      )}
    </div>
  );
};

export default InventoryFilters;