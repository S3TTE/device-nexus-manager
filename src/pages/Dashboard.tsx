
import React from "react";
import { 
  Cpu, 
  Shield, 
  AlertTriangle, 
  Users, 
  DownloadCloud, 
  Activity,
  ArrowUpRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { devices, getDeviceStats, getTechnicianStats } from "@/services/data";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const deviceStats = getDeviceStats();
  const techStats = getTechnicianStats();

  // Calculate percentage of online devices
  const onlinePercentage = Math.round((deviceStats.online / deviceStats.total) * 100);
  
  // Get a few recent devices for the dashboard
  const recentDevices = devices.slice(0, 3);

  return (
    <div className="grid gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">IoT Device Control Center</h2>
        <div className="flex gap-3">
          <Button variant="outline">
            <DownloadCloud className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <Shield className="mr-2 h-4 w-4" />
            System Scan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold">{deviceStats.total}</div>
              <div className="p-2 bg-primary/10 text-primary rounded-full">
                <Cpu size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <Progress value={onlinePercentage} className="h-2" />
              <span className="text-sm font-medium">{onlinePercentage}%</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {deviceStats.online} online, {deviceStats.offline} offline
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Device Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span>Online</span>
                </div>
                <span className="font-semibold">{deviceStats.online}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span>Offline</span>
                </div>
                <span className="font-semibold">{deviceStats.offline}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span>Maintenance</span>
                </div>
                <span className="font-semibold">{deviceStats.maintenance}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Firmware Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold">{deviceStats.needsFirmwareUpdate}</div>
              <div className="p-2 bg-yellow-500/10 text-yellow-500 rounded-full">
                <AlertTriangle size={24} />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Devices requiring firmware updates
            </p>
            <div className="mt-4">
              <Button variant="outline" size="sm" asChild>
                <Link to="/devices" className="flex items-center">
                  View devices
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Technicians</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold">{techStats.active}</div>
              <div className="p-2 bg-primary/10 text-primary rounded-full">
                <Users size={24} />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Active technicians ({techStats.canUpdateFirmware} can update firmware)
            </p>
            <div className="mt-4">
              <Button variant="outline" size="sm" asChild>
                <Link to="/technicians" className="flex items-center">
                  Manage technicians
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Recent Devices</CardTitle>
            <CardDescription>Latest registered devices in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDevices.map(device => (
                <div key={device.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      device.status === 'online' ? 'bg-green-500 pulse-online' : 
                      device.status === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
                    }`} />
                    <div>
                      <p className="font-medium">{device.name}</p>
                      <p className="text-sm text-muted-foreground">{device.location}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {device.firmwareVersion}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link to="/devices">View all devices</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle>System Activity</CardTitle>
            <CardDescription>Recent activity across all devices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-full">
                  <Activity size={18} />
                </div>
                <div>
                  <p className="font-medium">Firmware Update</p>
                  <p className="text-sm text-muted-foreground">Temperature Sensor A1 updated to v2.3.1</p>
                </div>
                <div className="ml-auto text-sm text-muted-foreground">10m ago</div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
                <div className="p-2 bg-red-500/10 text-red-500 rounded-full">
                  <AlertTriangle size={18} />
                </div>
                <div>
                  <p className="font-medium">Status Change</p>
                  <p className="text-sm text-muted-foreground">Motion Detector B2 went offline</p>
                </div>
                <div className="ml-auto text-sm text-muted-foreground">2h ago</div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
                <div className="p-2 bg-green-500/10 text-green-500 rounded-full">
                  <Shield size={18} />
                </div>
                <div>
                  <p className="font-medium">Technician Update</p>
                  <p className="text-sm text-muted-foreground">Emily Chen granted admin access</p>
                </div>
                <div className="ml-auto text-sm text-muted-foreground">1d ago</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
