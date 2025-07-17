import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

// Modal Components
const AddPatientModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Add New Patient</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <Icon name="X" size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              required
            />
            <Input
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              required
            />
          </div>
          
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          
          <Input
            label="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            required
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date of Birth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
              required
            />
            <Select
              label="Gender"
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
              options={[
                { value: '', label: 'Select Gender' },
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' }
              ]}
              required
            />
          </div>
          
          <Input
            label="Address"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            required
          />
          
          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Patient
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ScheduleAppointmentModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    appointmentType: '',
    date: '',
    time: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Schedule Appointment</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <Icon name="X" size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Patient ID"
            value={formData.patientId}
            onChange={(e) => setFormData({...formData, patientId: e.target.value})}
            placeholder="Enter patient ID or search by name"
            required
          />
          
          <Select
            label="Appointment Type"
            value={formData.appointmentType}
            onChange={(e) => setFormData({...formData, appointmentType: e.target.value})}
            options={[
              { value: '', label: 'Select Type' },
              { value: 'eye-exam', label: 'Eye Exam' },
              { value: 'contact-fitting', label: 'Contact Lens Fitting' },
              { value: 'follow-up', label: 'Follow-up' },
              { value: 'emergency', label: 'Emergency' }
            ]}
            required
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />
            <Input
              label="Time"
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              required
            />
          </div>
          
          <Input
            label="Notes"
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            placeholder="Additional notes..."
          />
          
          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Schedule
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const UpdatePrescriptionModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    prescriptionType: '',
    rightEye: { sphere: '', cylinder: '', axis: '' },
    leftEye: { sphere: '', cylinder: '', axis: '' },
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Update Prescription</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <Icon name="X" size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Patient ID"
            value={formData.patientId}
            onChange={(e) => setFormData({...formData, patientId: e.target.value})}
            placeholder="Enter patient ID"
            required
          />
          
          <Select
            label="Prescription Type"
            value={formData.prescriptionType}
            onChange={(e) => setFormData({...formData, prescriptionType: e.target.value})}
            options={[
              { value: '', label: 'Select Type' },
              { value: 'distance', label: 'Distance Glasses' },
              { value: 'reading', label: 'Reading Glasses' },
              { value: 'bifocal', label: 'Bifocal' },
              { value: 'progressive', label: 'Progressive' },
              { value: 'contacts', label: 'Contact Lenses' }
            ]}
            required
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-700">Right Eye</h4>
              <div className="grid grid-cols-3 gap-2">
                <Input
                  label="Sphere"
                  value={formData.rightEye.sphere}
                  onChange={(e) => setFormData({
                    ...formData, 
                    rightEye: {...formData.rightEye, sphere: e.target.value}
                  })}
                  placeholder="0.00"
                />
                <Input
                  label="Cylinder"
                  value={formData.rightEye.cylinder}
                  onChange={(e) => setFormData({
                    ...formData, 
                    rightEye: {...formData.rightEye, cylinder: e.target.value}
                  })}
                  placeholder="0.00"
                />
                <Input
                  label="Axis"
                  value={formData.rightEye.axis}
                  onChange={(e) => setFormData({
                    ...formData, 
                    rightEye: {...formData.rightEye, axis: e.target.value}
                  })}
                  placeholder="0"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-gray-700">Left Eye</h4>
              <div className="grid grid-cols-3 gap-2">
                <Input
                  label="Sphere"
                  value={formData.leftEye.sphere}
                  onChange={(e) => setFormData({
                    ...formData, 
                    leftEye: {...formData.leftEye, sphere: e.target.value}
                  })}
                  placeholder="0.00"
                />
                <Input
                  label="Cylinder"
                  value={formData.leftEye.cylinder}
                  onChange={(e) => setFormData({
                    ...formData, 
                    leftEye: {...formData.leftEye, cylinder: e.target.value}
                  })}
                  placeholder="0.00"
                />
                <Input
                  label="Axis"
                  value={formData.leftEye.axis}
                  onChange={(e) => setFormData({
                    ...formData, 
                    leftEye: {...formData.leftEye, axis: e.target.value}
                  })}
                  placeholder="0"
                />
              </div>
            </div>
          </div>
          
          <Input
            label="Notes"
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            placeholder="Additional notes..."
          />
          
          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Update Prescription
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProcessSaleModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    items: [{ productId: '', quantity: 1, price: 0 }],
    paymentMethod: '',
    total: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Process Sale</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <Icon name="X" size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Patient ID"
            value={formData.patientId}
            onChange={(e) => setFormData({...formData, patientId: e.target.value})}
            placeholder="Enter patient ID (optional)"
          />
          
          <div className="space-y-3">
            <h4 className="font-medium text-gray-700">Items</h4>
            {formData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-3 gap-2">
                <Input
                  label="Product"
                  value={item.productId}
                  onChange={(e) => {
                    const newItems = [...formData.items];
                    newItems[index].productId = e.target.value;
                    setFormData({...formData, items: newItems});
                  }}
                  placeholder="Product ID"
                />
                <Input
                  label="Qty"
                  type="number"
                  value={item.quantity}
                  onChange={(e) => {
                    const newItems = [...formData.items];
                    newItems[index].quantity = parseInt(e.target.value);
                    setFormData({...formData, items: newItems});
                  }}
                  min="1"
                />
                <Input
                  label="Price"
                  type="number"
                  step="0.01"
                  value={item.price}
                  onChange={(e) => {
                    const newItems = [...formData.items];
                    newItems[index].price = parseFloat(e.target.value);
                    setFormData({...formData, items: newItems});
                  }}
                  placeholder="0.00"
                />
              </div>
            ))}
          </div>
          
          <Select
            label="Payment Method"
            value={formData.paymentMethod}
            onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
            options={[
              { value: '', label: 'Select Payment Method' },
              { value: 'cash', label: 'Cash' },
              { value: 'credit-card', label: 'Credit Card' },
              { value: 'debit-card', label: 'Debit Card' },
              { value: 'insurance', label: 'Insurance' }
            ]}
            required
          />
          
          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Process Sale
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CheckInventoryModal = ({ isOpen, onClose }) => {
  const mockInventory = [
    { id: 1, name: "Ray-Ban Aviator", sku: "RB-AV-001", quantity: 15, status: "In Stock" },
    { id: 2, name: "Progressive Lenses", sku: "PL-HI-002", quantity: 5, status: "Low Stock" },
    { id: 3, name: "Contact Lens Solution", sku: "CLS-SOL-004", quantity: 45, status: "In Stock" },
    { id: 4, name: "Blue Light Lenses", sku: "BLB-LEN-005", quantity: 8, status: "Low Stock" }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Current Inventory Levels</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <Icon name="X" size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockInventory.map((item) => (
              <div key={item.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{item.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    item.status === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">SKU: {item.sku}</p>
                <p className="text-lg font-semibold">Quantity: {item.quantity}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end pt-4">
            <Button onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PatientHistoryModal = ({ isOpen, onClose }) => {
  const mockHistory = [
    { date: "2024-01-15", service: "Eye Exam", doctor: "Dr. Smith", notes: "Routine checkup" },
    { date: "2024-01-10", service: "Contact Fitting", doctor: "Dr. Johnson", notes: "First time contacts" },
    { date: "2023-12-20", service: "Glasses Prescription", doctor: "Dr. Williams", notes: "Updated prescription" }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Patient Service History</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <Icon name="X" size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          <Input
            label="Patient ID"
            placeholder="Enter patient ID to view history"
          />
          
          <div className="space-y-3">
            {mockHistory.map((record, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{record.service}</h4>
                  <span className="text-sm text-gray-600">{record.date}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">Doctor: {record.doctor}</p>
                <p className="text-sm">{record.notes}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end pt-4">
            <Button onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickActions = () => {
  const [activeModal, setActiveModal] = useState(null);

  const quickActionItems = [
    {
      id: 1,
      title: "Add New Patient",
      description: "Register a new patient in the system",
      icon: "UserPlus",
      color: "bg-blue-500",
      modal: "addPatient"
    },
    {
      id: 2,
      title: "Schedule Appointment",
      description: "Book an appointment for existing patient",
      icon: "Calendar",
      color: "bg-green-500",
      modal: "scheduleAppointment"
    },
    {
      id: 3,
      title: "Update Prescription",
      description: "Modify patient prescription details",
      icon: "FileText",
      color: "bg-purple-500",
      modal: "updatePrescription"
    },
    {
      id: 4,
      title: "Process Sale",
      description: "Complete product sale transaction",
      icon: "ShoppingCart",
      color: "bg-orange-500",
      modal: "processSale"
    },
    {
      id: 5,
      title: "Check Inventory",
      description: "View current stock levels",
      icon: "Package",
      color: "bg-teal-500",
      modal: "checkInventory"
    },
    {
      id: 6,
      title: "Patient History",
      description: "View patient service history",
      icon: "History",
      color: "bg-indigo-500",
      modal: "patientHistory"
    }
  ];

  const handleAction = (modalType) => {
    setActiveModal(modalType);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleSave = (data) => {
    console.log('Saving data:', data);
    // Here you would typically save to your backend
    alert('Action completed successfully!');
  };

  return (
    <>
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
          <p className="text-sm text-muted-foreground">Frequently used tasks</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActionItems.map((item) => (
          <button
            key={item.id}
              onClick={() => handleAction(item.modal)}
            className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-hover text-left group"
          >
            <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
              <Icon name={item.icon} size={20} color="white" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                {item.title}
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                {item.description}
              </p>
            </div>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
        ))}
      </div>

      {/* Additional Quick Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">12</p>
            <p className="text-xs text-muted-foreground">Today's Tasks</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">8</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">67%</p>
            <p className="text-xs text-muted-foreground">Efficiency</p>
          </div>
        </div>
      </div>
    </div>

      {/* Modals */}
      <AddPatientModal 
        isOpen={activeModal === 'addPatient'} 
        onClose={handleCloseModal} 
        onSave={handleSave} 
      />
      <ScheduleAppointmentModal 
        isOpen={activeModal === 'scheduleAppointment'} 
        onClose={handleCloseModal} 
        onSave={handleSave} 
      />
      <UpdatePrescriptionModal 
        isOpen={activeModal === 'updatePrescription'} 
        onClose={handleCloseModal} 
        onSave={handleSave} 
      />
      <ProcessSaleModal 
        isOpen={activeModal === 'processSale'} 
        onClose={handleCloseModal} 
        onSave={handleSave} 
      />
      <CheckInventoryModal 
        isOpen={activeModal === 'checkInventory'} 
        onClose={handleCloseModal} 
      />
      <PatientHistoryModal 
        isOpen={activeModal === 'patientHistory'} 
        onClose={handleCloseModal} 
      />
    </>
  );
};

export default QuickActions;