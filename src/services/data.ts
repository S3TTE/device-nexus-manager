
// Types
export interface Device {
  id: string;
  name: string;
  type: string;
  location: string;
  status: 'online' | 'offline' | 'maintenance';
  firmwareVersion: string;
  installedDate: string;
  registeredDate: string;
  lastUpdated: string;
  ipAddress: string;
  macAddress: string;
  batteryLevel?: number;
}

export interface Technician {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  permissions: string[];
  lastActive: string;
  completedUpdates: number;
  successRate: number;
}

// Mock data
export const devices: Device[] = [
  {
    id: "dev-001",
    name: "Temperature Sensor A1",
    type: "Temperature Sensor",
    location: "Building A, Floor 1",
    status: "online",
    firmwareVersion: "v2.3.1",
    installedDate: "2024-02-15",
    registeredDate: "2024-02-10",
    lastUpdated: "2024-04-05",
    ipAddress: "192.168.1.101",
    macAddress: "AA:BB:CC:11:22:33",
    batteryLevel: 87
  },
  {
    id: "dev-002",
    name: "Motion Detector B2",
    type: "Motion Sensor",
    location: "Building B, Floor 2",
    status: "offline",
    firmwareVersion: "v1.9.5",
    installedDate: "2023-11-20",
    registeredDate: "2023-11-15",
    lastUpdated: "2024-03-20",
    ipAddress: "192.168.1.102",
    macAddress: "AA:BB:CC:44:55:66",
    batteryLevel: 23
  },
  {
    id: "dev-003",
    name: "Smart Thermostat C3",
    type: "Thermostat",
    location: "Building C, Floor 3",
    status: "maintenance",
    firmwareVersion: "v3.0.0",
    installedDate: "2024-01-10",
    registeredDate: "2024-01-05",
    lastUpdated: "2024-04-10",
    ipAddress: "192.168.1.103",
    macAddress: "AA:BB:CC:77:88:99"
  },
  {
    id: "dev-004",
    name: "Environmental Monitor D4",
    type: "Air Quality Sensor",
    location: "Building D, Floor 4",
    status: "online",
    firmwareVersion: "v2.1.3",
    installedDate: "2023-12-05",
    registeredDate: "2023-12-01",
    lastUpdated: "2024-03-15",
    ipAddress: "192.168.1.104",
    macAddress: "AA:BB:CC:AA:BB:CC",
    batteryLevel: 92
  },
  {
    id: "dev-005",
    name: "Security Camera E5",
    type: "Camera",
    location: "Building E, Floor 5",
    status: "online",
    firmwareVersion: "v4.2.1",
    installedDate: "2024-03-20",
    registeredDate: "2024-03-15",
    lastUpdated: "2024-04-01",
    ipAddress: "192.168.1.105",
    macAddress: "AA:BB:CC:DD:EE:FF"
  },
  {
    id: "dev-006",
    name: "Smart Light F6",
    type: "Light Controller",
    location: "Building F, Floor 6",
    status: "offline",
    firmwareVersion: "v1.5.7",
    installedDate: "2023-10-10",
    registeredDate: "2023-10-05",
    lastUpdated: "2024-02-20",
    ipAddress: "192.168.1.106",
    macAddress: "AA:BB:CC:11:22:44",
    batteryLevel: 15
  }
];

export const technicians: Technician[] = [
  {
    id: "tech-001",
    name: "John Smith",
    email: "john.smith@example.com",
    role: "Senior Technician",
    status: "active",
    permissions: ["update_firmware", "register_device", "decommission_device"],
    lastActive: "2024-04-13",
    completedUpdates: 143,
    successRate: 97.8
  },
  {
    id: "tech-002",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "Field Technician",
    status: "active",
    permissions: ["update_firmware", "register_device"],
    lastActive: "2024-04-12",
    completedUpdates: 98,
    successRate: 95.2
  },
  {
    id: "tech-003",
    name: "Miguel Rodriguez",
    email: "miguel.r@example.com",
    role: "Junior Technician",
    status: "inactive",
    permissions: ["register_device"],
    lastActive: "2024-03-30",
    completedUpdates: 42,
    successRate: 88.6
  },
  {
    id: "tech-004",
    name: "Emily Chen",
    email: "emily.chen@example.com",
    role: "Senior Technician",
    status: "active",
    permissions: ["update_firmware", "register_device", "decommission_device", "admin_access"],
    lastActive: "2024-04-14",
    completedUpdates: 211,
    successRate: 99.1
  },
  {
    id: "tech-005",
    name: "David Williams",
    email: "d.williams@example.com",
    role: "Field Technician",
    status: "active",
    permissions: ["update_firmware", "register_device"],
    lastActive: "2024-04-11",
    completedUpdates: 87,
    successRate: 92.3
  }
];

// Summary statistics
export const getDeviceStats = () => {
  const total = devices.length;
  const online = devices.filter(d => d.status === 'online').length;
  const offline = devices.filter(d => d.status === 'offline').length;
  const maintenance = devices.filter(d => d.status === 'maintenance').length;
  
  const needsFirmwareUpdate = devices.filter(d => {
    const version = d.firmwareVersion.replace('v', '');
    const [major, minor, patch] = version.split('.').map(Number);
    return major < 2 || (major === 2 && minor < 3);
  }).length;

  return {
    total,
    online,
    offline,
    maintenance,
    needsFirmwareUpdate
  };
};

export const getTechnicianStats = () => {
  const total = technicians.length;
  const active = technicians.filter(t => t.status === 'active').length;
  const inactive = technicians.filter(t => t.status === 'inactive').length;
  
  const canUpdateFirmware = technicians.filter(t => 
    t.permissions.includes('update_firmware') && t.status === 'active'
  ).length;

  return {
    total,
    active,
    inactive,
    canUpdateFirmware
  };
};

// Function to toggle technician status
export const toggleTechnicianStatus = (id: string) => {
  const techIndex = technicians.findIndex(t => t.id === id);
  if (techIndex !== -1) {
    technicians[techIndex].status = 
      technicians[techIndex].status === 'active' ? 'inactive' : 'active';
  }
  return [...technicians];
};

// Function to update technician permissions
export const updateTechnicianPermissions = (
  id: string, 
  permissions: string[]
) => {
  const techIndex = technicians.findIndex(t => t.id === id);
  if (techIndex !== -1) {
    technicians[techIndex].permissions = permissions;
  }
  return [...technicians];
};
