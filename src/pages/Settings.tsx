
import React from "react";
import { 
  Bell, 
  Globe, 
  Lock, 
  Shield, 
  Database, 
  RefreshCw,
  Server
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Settings: React.FC = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Settings</h2>
        <p className="text-muted-foreground mt-2">
          Manage your system settings and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="updates">Updates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>
                Configure your general system preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable dark mode for the interface
                    </p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Automatic Logout</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically log out after 30 minutes of inactivity
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Telemetry</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow anonymous usage data collection to improve the system
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                Data Management
              </CardTitle>
              <CardDescription>
                Manage your system data and storage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Database Size</h4>
                    <p className="text-sm text-muted-foreground">
                      Current storage usage
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">245 MB</p>
                    <p className="text-sm text-muted-foreground">of 1 GB</p>
                  </div>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: "24.5%" }}></div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline">Export Data</Button>
                <Button variant="outline">Backup Database</Button>
                <Button variant="destructive">Clear Cache</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Device Status Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when device status changes
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Firmware Update Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when new firmware is available
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Maintenance Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Get reminders for scheduled maintenance
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="mr-2 h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Configure security and authentication preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for all administrator accounts
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Password Expiration</Label>
                    <p className="text-sm text-muted-foreground">
                      Require password changes every 90 days
                    </p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">IP Restrictions</Label>
                    <p className="text-sm text-muted-foreground">
                      Limit access to specified IP addresses
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <div className="pt-4">
                <h4 className="font-medium mb-2">Security Audit Log</h4>
                <div className="bg-secondary rounded-md p-4 text-sm">
                  <p className="flex justify-between">
                    <span>Admin login</span>
                    <span className="text-muted-foreground">Today, 09:41 AM</span>
                  </p>
                  <p className="flex justify-between mt-2">
                    <span>System settings modified</span>
                    <span className="text-muted-foreground">Yesterday, 03:23 PM</span>
                  </p>
                  <p className="flex justify-between mt-2">
                    <span>Password policy updated</span>
                    <span className="text-muted-foreground">Apr 12, 2024, 11:15 AM</span>
                  </p>
                </div>
                <Button variant="outline" className="mt-4 w-full">View Full Audit Log</Button>
              </div>
              
              <Button onClick={handleSave}>Save Changes</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Access Control
              </CardTitle>
              <CardDescription>
                Manage role-based access control
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Administrator Role</h4>
                    <p className="text-sm text-muted-foreground">
                      Full system access and management
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Edit Permissions</Button>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Technician Role</h4>
                    <p className="text-sm text-muted-foreground">
                      Device management and updates
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Edit Permissions</Button>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Viewer Role</h4>
                    <p className="text-sm text-muted-foreground">
                      Read-only access to system data
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Edit Permissions</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="updates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RefreshCw className="mr-2 h-5 w-5" />
                System Updates
              </CardTitle>
              <CardDescription>
                Manage system and firmware updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-secondary rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Current System Version</h4>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500">
                    Up to Date
                  </Badge>
                </div>
                <p className="text-xl font-semibold">v2.4.1</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Last checked: April 14, 2024 at 08:30 AM
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Automatic Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically download and install system updates
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Update Schedule</Label>
                    <p className="text-sm text-muted-foreground">
                      Install updates during scheduled maintenance windows
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Firmware Auto-Deployment</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically deploy firmware updates to devices
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Check for Updates
                </Button>
                <Button variant="outline">Update History</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="mr-2 h-5 w-5" />
                Firmware Repository
              </CardTitle>
              <CardDescription>
                Manage firmware versions for your devices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Temperature Sensors</h4>
                    <p className="text-sm text-muted-foreground">
                      Latest version: v2.3.1
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Motion Detectors</h4>
                    <p className="text-sm text-muted-foreground">
                      Latest version: v1.9.5
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Smart Thermostats</h4>
                    <p className="text-sm text-muted-foreground">
                      Latest version: v3.0.0
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Environmental Monitors</h4>
                    <p className="text-sm text-muted-foreground">
                      Latest version: v2.1.3
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              </div>
              <Button className="mt-6 w-full" variant="outline">
                Upload New Firmware
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
