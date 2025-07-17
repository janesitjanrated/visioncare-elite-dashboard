import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import InventoryStats from './components/InventoryStats';
import InventoryFilters from './components/InventoryFilters';
import InventoryTable from './components/InventoryTable';
import ReorderNotifications from './components/ReorderNotifications';
import QuickActions from './components/QuickActions';
import { useAuth } from '../../contexts/AuthContext';

const InventoryStockManagement = () => {
  const { user: authUser, userProfile } = useAuth();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});

  // Use authenticated user data
  const user = authUser ? {
    id: authUser.id,
    name: authUser.name || userProfile?.name || "User",
    email: authUser.email,
    role: authUser.role || "staff",
    avatar: userProfile?.avatar || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"
  } : {
    id: 1,
    name: "Demo User",
    email: "demo@clinicvision.com",
    role: "staff",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"
  };

  // Mock branches data
  const branches = [
    {
      id: 1,
      name: "Downtown Vision Center",
      address: "123 Main St, Downtown",
      status: "active"
    },
    {
      id: 2,
      name: "Westside Eye Care",
      address: "456 Oak Ave, Westside",
      status: "active"
    }
  ];

  const [selectedBranch, setSelectedBranch] = useState(branches[0]);

  // Mock inventory data
  const mockProducts = [
    {
      id: 1,
      name: "Ray-Ban Aviator Classic",
      sku: "RB-AV-001",
      category: "frames",
      quantity: 15,
      reorderPoint: 10,
      price: 154.99,
      supplier: "Luxottica Group",
      status: "in_stock",
      isCustom: false,
      lastUpdated: "2025-01-10"
    },
    {
      id: 2,
      name: "Progressive Lenses - High Index",
      sku: "PL-HI-002",
      category: "lenses",
      quantity: 5,
      reorderPoint: 8,
      price: 299.99,
      supplier: "Essilor International",
      status: "low_stock",
      isCustom: false,
      lastUpdated: "2025-01-09"
    },
    {
      id: 3,
      name: "Custom Titanium Frame",
      sku: "CTF-TI-003",
      category: "frames",
      quantity: 0,
      reorderPoint: 3,
      price: 450.00,
      supplier: "Custom Fabrication",
      status: "out_of_stock",
      isCustom: true,
      lastUpdated: "2025-01-08"
    },
    {
      id: 4,
      name: "Contact Lens Solution",
      sku: "CLS-SOL-004",
      category: "solutions",
      quantity: 45,
      reorderPoint: 20,
      price: 12.99,
      supplier: "Bausch + Lomb",
      status: "in_stock",
      isCustom: false,
      lastUpdated: "2025-01-11"
    },
    {
      id: 5,
      name: "Blue Light Blocking Lenses",
      sku: "BLB-LEN-005",
      category: "lenses",
      quantity: 8,
      reorderPoint: 12,
      price: 89.99,
      supplier: "Essilor International",
      status: "low_stock",
      isCustom: false,
      lastUpdated: "2025-01-10"
    },
    {
      id: 6,
      name: "Lens Cleaning Kit",
      sku: "LCK-ACC-006",
      category: "accessories",
      quantity: 25,
      reorderPoint: 15,
      price: 19.99,
      supplier: "Safilo Group",
      status: "in_stock",
      isCustom: false,
      lastUpdated: "2025-01-12"
    },
    {
      id: 7,
      name: "Oakley Sports Frames",
      sku: "OAK-SPT-007",
      category: "frames",
      quantity: 3,
      reorderPoint: 8,
      price: 189.99,
      supplier: "Luxottica Group",
      status: "low_stock",
      isCustom: false,
      lastUpdated: "2025-01-09"
    },
    {
      id: 8,
      name: "Vintage Collection Frame",
      sku: "VCF-VIN-008",
      category: "frames",
      quantity: 12,
      reorderPoint: 5,
      price: 275.00,
      supplier: "Marchon Eyewear",
      status: "discontinued",
      isCustom: false,
      lastUpdated: "2025-01-07"
    }
  ];

  // Mock reorder notifications
  const mockReorderNotifications = [
    {
      id: 1,
      productName: "Progressive Lenses - High Index",
      sku: "PL-HI-002",
      currentStock: 5,
      reorderPoint: 8,
      suggestedQuantity: 20,
      estimatedCost: 5999.80,
      priority: "high",
      supplier: "Essilor International",
      supplierContact: "orders@essilor.com",
      leadTime: 7,
      lastOrderDate: "2024-12-15",
      avgMonthlySales: 12,
      daysUntilOut: 10,
      notes: "High demand item, consider increasing reorder quantity"
    },
    {
      id: 2,
      productName: "Blue Light Blocking Lenses",
      sku: "BLB-LEN-005",
      currentStock: 8,
      reorderPoint: 12,
      suggestedQuantity: 25,
      estimatedCost: 2249.75,
      priority: "medium",
      supplier: "Essilor International",
      supplierContact: "orders@essilor.com",
      leadTime: 5,
      lastOrderDate: "2024-12-20",
      avgMonthlySales: 8,
      daysUntilOut: 15,
      notes: "Popular with office workers"
    },
    {
      id: 3,
      productName: "Oakley Sports Frames",
      sku: "OAK-SPT-007",
      currentStock: 3,
      reorderPoint: 8,
      suggestedQuantity: 15,
      estimatedCost: 2849.85,
      priority: "medium",
      supplier: "Luxottica Group",
      supplierContact: "orders@luxottica.com",
      leadTime: 10,
      lastOrderDate: "2024-12-10",
      avgMonthlySales: 6,
      daysUntilOut: 12,
      notes: "Summer season approaching, expect increased demand"
    }
  ];

  // Mock inventory statistics
  const inventoryStats = {
    totalProducts: mockProducts.length,
    productChange: 5.2,
    totalValue: mockProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0),
    valueChange: 12.8,
    lowStockItems: mockProducts.filter(p => p.quantity <= p.reorderPoint && p.quantity > 0).length,
    lowStockChange: -15.3,
    outOfStockItems: mockProducts.filter(p => p.quantity === 0).length,
    outOfStockChange: -25.0
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filters]);

  const applyFilters = () => {
    let filtered = [...mockProducts];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(product => {
        switch (filters.status) {
          case 'in_stock':
            return product.quantity > product.reorderPoint;
          case 'low_stock':
            return product.quantity <= product.reorderPoint && product.quantity > 0;
          case 'out_of_stock':
            return product.quantity === 0;
          case 'discontinued':
            return product.status === 'discontinued';
          case 'pending_order':
            return product.status === 'pending_order';
          default:
            return true;
        }
      });
    }

    // Apply supplier filter
    if (filters.supplier) {
      filtered = filtered.filter(product => 
        product.supplier.toLowerCase().includes(filters.supplier.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleToggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleBranchChange = (branch) => {
    setSelectedBranch(branch);
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredProducts.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredProducts.map(product => product.id));
    }
  };

  const handleEditProduct = (product) => {
    console.log('Edit product:', product);
    // Implementation for editing product
  };

  const handleDeleteProduct = (product) => {
    console.log('Delete product:', product);
    // Implementation for deleting product
  };

  const handleReorderProduct = (product) => {
    console.log('Reorder product:', product);
    // Implementation for reordering product
  };

  const handleBulkAction = (action) => {
    console.log('Bulk action:', action, 'for items:', selectedItems);
    // Implementation for bulk actions
  };

  const handleAddProduct = () => {
    console.log('Add new product');
    // Implementation for adding new product
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleReorderNotification = (notification) => {
    console.log('Reorder from notification:', notification);
    // Implementation for reordering from notification
  };

  const handleDismissNotification = (notificationId) => {
    console.log('Dismiss notification:', notificationId);
    // Implementation for dismissing notification
  };

  const handleReorderAll = () => {
    console.log('Reorder all items');
    // Implementation for reordering all items
  };

  const handleQuickAction = (actionId) => {
    console.log('Quick action:', actionId);
    // Implementation for quick actions
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <NavigationHeader
        user={user}
        branches={branches}
        selectedBranch={selectedBranch}
        onBranchChange={handleBranchChange}
        onToggleSidebar={handleToggleSidebar}
        sidebarExpanded={sidebarExpanded}
      />

      {/* Sidebar */}
      <RoleBasedSidebar
        user={user}
        isExpanded={sidebarExpanded}
        onToggle={handleToggleSidebar}
      />

      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${
        sidebarExpanded ? 'lg:ml-60' : 'lg:ml-16'
      }`}>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Inventory & Stock Management</h1>
              <p className="text-muted-foreground mt-1">
                Manage your optical inventory with automated reorder notifications
              </p>
            </div>
          </div>

          {/* Inventory Statistics */}
          <InventoryStats stats={inventoryStats} />

          {/* Reorder Notifications */}
          {mockReorderNotifications.length > 0 && (
            <ReorderNotifications
              notifications={mockReorderNotifications}
              onReorder={handleReorderNotification}
              onDismiss={handleDismissNotification}
              onReorderAll={handleReorderAll}
            />
          )}

          {/* Quick Actions */}
          <QuickActions onAction={handleQuickAction} />

          {/* Filters */}
          <InventoryFilters
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            onAddProduct={handleAddProduct}
            selectedCount={selectedItems.length}
            onBulkAction={handleBulkAction}
          />

          {/* Inventory Table */}
          <InventoryTable
            products={filteredProducts}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onReorder={handleReorderProduct}
            onBulkAction={handleBulkAction}
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
            onSelectAll={handleSelectAll}
          />

          {/* Results Summary */}
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} of {mockProducts.length} products
              {selectedItems.length > 0 && (
                <span className="ml-2 text-primary font-medium">
                  • {selectedItems.length} selected
                </span>
              )}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InventoryStockManagement;