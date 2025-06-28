
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo: string;
  dueDate: string;
  createdAt: string;
}

const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'ตรวจสอบอุปกรณ์ตรวจตา',
    description: 'ตรวจสอบและบำรุงรักษาเครื่องตรวจสายตาประจำวัน',
    priority: 'high',
    status: 'pending',
    assignedTo: 'พยาบาล สมหญิง',
    dueDate: '2024-06-21',
    createdAt: '2024-06-20'
  },
  {
    id: '2',
    title: 'เตรียมห้องตรวจ',
    description: 'ทำความสะอาดและเตรียมอุปกรณ์ในห้องตรวจ',
    priority: 'medium',
    status: 'in-progress',
    assignedTo: 'เจ้าหน้าที่ บุญมี',
    dueDate: '2024-06-21',
    createdAt: '2024-06-20'
  },
  {
    id: '3',
    title: 'อัพเดทข้อมูลผู้ป่วย',
    description: 'บันทึกผลการตรวจและอัพเดทประวัติการรักษา',
    priority: 'low',
    status: 'completed',
    assignedTo: 'เลขานุการ สมศรี',
    dueDate: '2024-06-20',
    createdAt: '2024-06-19'
  }
];

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as Task['priority'],
    assignedTo: '',
    dueDate: ''
  });
  const { toast } = useToast();

  const handleStatusChange = (id: string, newStatus: Task['status']) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
    toast({
      title: "อัพเดทสถานะสำเร็จ",
      description: `เปลี่ยนสถานะงานเป็น ${newStatus}`,
    });
  };

  const handleDelete = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    toast({
      title: "ลบงานสำเร็จ",
      description: "ลบงานจากรายการเรียบร้อยแล้ว",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const task: Task = {
      id: Date.now().toString(),
      ...newTask,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTasks(prev => [task, ...prev]);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      assignedTo: '',
      dueDate: ''
    });
    setShowForm(false);
    toast({
      title: "เพิ่มงานใหม่สำเร็จ",
      description: `เพิ่มงาน "${task.title}" เรียบร้อยแล้ว`,
    });
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Task Daily</h2>
              <Button 
                onClick={() => setShowForm(true)}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                เพิ่มงานใหม่
              </Button>
            </div>

            {showForm && (
              <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                <h3 className="text-lg font-semibold mb-4">เพิ่มงานใหม่</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ชื่องาน
                      </label>
                      <input
                        type="text"
                        value={newTask.title}
                        onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        มอบหมายให้
                      </label>
                      <input
                        type="text"
                        value={newTask.assignedTo}
                        onChange={(e) => setNewTask(prev => ({ ...prev, assignedTo: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ความสำคัญ
                      </label>
                      <select
                        value={newTask.priority}
                        onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value as Task['priority'] }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="low">ต่ำ</option>
                        <option value="medium">ปานกลาง</option>
                        <option value="high">สูง</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        วันครบกำหนด
                      </label>
                      <input
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      รายละเอียด
                    </label>
                    <textarea
                      value={newTask.description}
                      onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      ยกเลิก
                    </Button>
                    <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                      บันทึก
                    </Button>
                  </div>
                </form>
              </div>
            )}

            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg">{task.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority === 'high' ? 'สูง' : task.priority === 'medium' ? 'ปานกลาง' : 'ต่ำ'}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status === 'pending' ? 'รอดำเนินการ' : 
                           task.status === 'in-progress' ? 'กำลังดำเนินการ' : 'เสร็จสิ้น'}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{task.description}</p>
                      <div className="text-sm text-gray-500">
                        <p>มอบหมายให้: {task.assignedTo}</p>
                        <p>ครบกำหนด: {new Date(task.dueDate).toLocaleDateString('th-TH')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {task.status !== 'completed' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(task.id, 'completed')}
                          className="text-green-600 border-green-200 hover:bg-green-50"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          เสร็จสิ้น
                        </Button>
                      )}
                      {task.status === 'pending' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(task.id, 'in-progress')}
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                          เริ่มงาน
                        </Button>
                      )}
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleDelete(task.id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tasks;
