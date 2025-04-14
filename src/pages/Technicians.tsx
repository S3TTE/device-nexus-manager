
import React, { useState } from "react";
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Check, 
  X, 
  UserCog, 
  Shield,
  Download,
  Users,
  Trash2
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { technicians, toggleTechnicianStatus, Technician } from "@/services/data";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface TechnicianPermissionsProps {
  technician: Technician;
}

const TechnicianPermissions: React.FC<TechnicianPermissionsProps> = ({ technician }) => {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([...technician.permissions]);
  const { toast } = useToast();

  const availablePermissions = [
    { id: "update_firmware", label: "Update Firmware" },
    { id: "register_device", label: "Register Devices" },
    { id: "decommission_device", label: "Decommission Devices" },
    { id: "admin_access", label: "Admin Access" }
  ];

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setSelectedPermissions(prev => [...prev, permissionId]);
    } else {
      setSelectedPermissions(prev => prev.filter(id => id !== permissionId));
    }
  };

  const handleSave = () => {
    toast({
      title: "Permissions updated",
      description: `Permissions for ${technician.name} have been updated.`,
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Permissions: {technician.name}</DialogTitle>
        <DialogDescription>
          Update the permissions for this technician. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4 py-4">
        {availablePermissions.map(permission => (
          <div key={permission.id} className="flex items-center space-x-2">
            <Checkbox 
              id={`permission-${permission.id}`} 
              checked={selectedPermissions.includes(permission.id)}
              onCheckedChange={(checked) => 
                handlePermissionChange(permission.id, checked as boolean)
              }
            />
            <Label 
              htmlFor={`permission-${permission.id}`}
              className="cursor-pointer"
            >
              {permission.label}
            </Label>
          </div>
        ))}
      </div>
      
      <DialogFooter>
        <Button variant="outline" onClick={() => setSelectedPermissions([...technician.permissions])}>
          Reset
        </Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </DialogFooter>
    </DialogContent>
  );
};

const TechnicianRow: React.FC<{ technician: Technician; onStatusToggle: (id: string) => void }> = ({ 
  technician, 
  onStatusToggle 
}) => {
  const { toast } = useToast();

  const handleStatusToggle = () => {
    onStatusToggle(technician.id);
    toast({
      title: `Technician ${technician.status === 'active' ? 'deactivated' : 'activated'}`,
      description: `${technician.name} has been ${technician.status === 'active' ? 'deactivated' : 'activated'}.`,
    });
  };

  return (
    <TableRow className="border-t border-border">
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-medium">
            {technician.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium">{technician.name}</p>
            <p className="text-sm text-muted-foreground">{technician.email}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={technician.status === 'active' ? 'outline' : 'secondary'}>
          {technician.role}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <div className="flex flex-wrap gap-1">
          {technician.permissions.includes('update_firmware') && (
            <Badge variant="outline" className="bg-primary/10 text-primary">Firmware</Badge>
          )}
          {technician.permissions.includes('register_device') && (
            <Badge variant="outline" className="bg-blue-500/10 text-blue-500">Register</Badge>
          )}
          {technician.permissions.includes('decommission_device') && (
            <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">Decommission</Badge>
          )}
          {technician.permissions.includes('admin_access') && (
            <Badge variant="outline" className="bg-purple-500/10 text-purple-500">Admin</Badge>
          )}
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">{technician.completedUpdates}</TableCell>
      <TableCell className="hidden md:table-cell">{technician.successRate}%</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Switch 
            checked={technician.status === 'active'} 
            onCheckedChange={handleStatusToggle}
          />
          <span className="text-sm font-medium">
            {technician.status === 'active' ? (
              <div className="flex items-center text-green-500">
                <Check size={14} className="mr-1" />
                Active
              </div>
            ) : (
              <div className="flex items-center text-red-500">
                <X size={14} className="mr-1" />
                Inactive
              </div>
            )}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <UserCog size={16} className="mr-1" />
                Permissions
              </Button>
            </DialogTrigger>
            <TechnicianPermissions technician={technician} />
          </Dialog>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <Shield size={16} className="mr-2" />
                View Activity
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Download size={16} className="mr-2" />
                Export Data
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive">
                <Trash2 size={16} className="mr-2" />
                Remove Technician
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );
};

const Technicians: React.FC = () => {
  const [techniciansList, setTechniciansList] = useState<Technician[]>(technicians);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredTechnicians = techniciansList.filter((tech) =>
    tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tech.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tech.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusToggle = (id: string) => {
    const updatedTechnicians = toggleTechnicianStatus(id);
    setTechniciansList(updatedTechnicians);
  };

  const activeCount = techniciansList.filter(t => t.status === 'active').length;
  const inactiveCount = techniciansList.filter(t => t.status === 'inactive').length;

  const handleAddTechnician = () => {
    toast({
      title: "Coming soon",
      description: "Add technician functionality will be available in the next update.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold">Technicians</h2>
        <Button onClick={handleAddTechnician}>
          <Plus className="mr-2 h-4 w-4" />
          Add Technician
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Technicians</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold">{techniciansList.length}</div>
              <div className="p-2 bg-primary/10 text-primary rounded-full">
                <Users size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Technicians</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold">{activeCount}</div>
              <div className="p-2 bg-green-500/10 text-green-500 rounded-full">
                <Check size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Inactive Technicians</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold">{inactiveCount}</div>
              <div className="p-2 bg-red-500/10 text-red-500 rounded-full">
                <X size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input 
          placeholder="Search technicians..." 
          className="pl-10 w-full sm:w-80"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Card>
        <CardContent className="p-0 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="hidden md:table-cell">Permissions</TableHead>
                <TableHead className="hidden md:table-cell">Updates</TableHead>
                <TableHead className="hidden md:table-cell">Success Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTechnicians.length > 0 ? (
                filteredTechnicians.map((tech) => (
                  <TechnicianRow
                    key={tech.id}
                    technician={tech}
                    onStatusToggle={handleStatusToggle}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No technicians found matching your search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Technicians;
