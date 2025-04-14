
import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  Plus, 
  ArrowUpDown, 
  DownloadCloud, 
  MoreVertical,
  RefreshCw,
  Info,
  EditIcon,
  Trash2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { devices, Device } from "@/services/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const DeviceRow: React.FC<{ device: Device }> = ({ device }) => {
  const { toast } = useToast();

  const handleUpdateFirmware = () => {
    toast({
      title: "Firmware update initiated",
      description: `Update scheduled for ${device.name}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500 text-green-50';
      case 'offline':
        return 'bg-red-500 text-red-50';
      case 'maintenance':
        return 'bg-yellow-500 text-yellow-50';
      default:
        return 'bg-gray-500 text-gray-50';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-card mb-3 border border-border device-card-transition">
      <div className="flex items-center gap-4">
        <div className={`w-4 h-4 rounded-full ${
          device.status === 'online' ? 'bg-green-500 pulse-online' : 
          device.status === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
        }`} />
        <div>
          <p className="font-medium">{device.name}</p>
          <p className="text-sm text-muted-foreground">{device.type}</p>
        </div>
      </div>
      
      <div className="hidden md:block">
        <p className="font-medium">{device.location}</p>
      </div>
      
      <div>
        <Badge variant="outline">{device.firmwareVersion}</Badge>
      </div>
      
      <div className="hidden md:block">
        <p className="text-sm text-muted-foreground">
          Installed: {new Date(device.installedDate).toLocaleDateString()}
        </p>
      </div>
      
      <div>
        <Badge className={`${getStatusColor(device.status)}`}>
          {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
        </Badge>
      </div>

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Device Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleUpdateFirmware}>
              <RefreshCw size={16} className="mr-2" />
              Update Firmware
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Info size={16} className="mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <EditIcon size={16} className="mr-2" />
              Edit Device
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive">
              <Trash2 size={16} className="mr-2" />
              Decommission
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

const DeviceCard: React.FC<{ device: Device }> = ({ device }) => {
  const { toast } = useToast();
  
  const handleUpdateFirmware = () => {
    toast({
      title: "Firmware update initiated",
      description: `Update scheduled for ${device.name}`,
    });
  };

  return (
    <Card className="device-card-transition">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg">{device.name}</h3>
            <p className="text-sm text-muted-foreground">{device.type}</p>
          </div>
          <Badge className={`${
            device.status === 'online' ? 'bg-green-500 text-green-50' : 
            device.status === 'offline' ? 'bg-red-500 text-red-50' : 'bg-yellow-500 text-yellow-50'
          }`}>
            {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
          </Badge>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Location</span>
            <span className="text-sm font-medium">{device.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Firmware</span>
            <span className="text-sm font-medium">{device.firmwareVersion}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Installed</span>
            <span className="text-sm font-medium">{new Date(device.installedDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Last Updated</span>
            <span className="text-sm font-medium">{new Date(device.lastUpdated).toLocaleDateString()}</span>
          </div>
          {device.batteryLevel !== undefined && (
            <div className="mt-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-muted-foreground">Battery</span>
                <span className="text-sm font-medium">{device.batteryLevel}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    device.batteryLevel > 70 ? 'bg-green-500' : 
                    device.batteryLevel > 30 ? 'bg-yellow-500' : 'bg-red-500'
                  }`} 
                  style={{ width: `${device.batteryLevel}%` }}>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={handleUpdateFirmware}>
                  <RefreshCw size={14} className="mr-1" />
                  Update
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Update device firmware</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">
                <Info size={14} className="mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <EditIcon size={14} className="mr-2" />
                Edit Device
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive">
                <Trash2 size={14} className="mr-2" />
                Decommission
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

const Devices: React.FC = () => {
  const [viewType, setViewType] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredDevices = devices.filter((device) =>
    device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDevice = () => {
    toast({
      title: "Coming soon",
      description: "Add device functionality will be available in the next update.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold">Devices</h2>
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleAddDevice}>
            <Plus className="mr-2 h-4 w-4" />
            Add Device
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search devices..." 
            className="pl-10 w-full sm:w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Sort
          </Button>
          <Button variant="outline">
            <DownloadCloud className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Tabs defaultValue={viewType} onValueChange={setViewType} className="w-[160px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="list">List</TabsTrigger>
              <TabsTrigger value="grid">Grid</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="mt-6">
        {viewType === "list" ? (
          <div>
            <div className="hidden md:flex justify-between text-sm font-medium text-muted-foreground px-4 py-2 mb-2">
              <div className="w-48">Device</div>
              <div className="w-48">Location</div>
              <div className="w-28">Firmware</div>
              <div className="w-40">Installed</div>
              <div className="w-24">Status</div>
              <div className="w-10"></div>
            </div>
            {filteredDevices.map((device) => (
              <DeviceRow key={device.id} device={device} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDevices.map((device) => (
              <DeviceCard key={device.id} device={device} />
            ))}
          </div>
        )}
        {filteredDevices.length === 0 && (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No devices found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Devices;
