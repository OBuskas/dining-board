'use client'

import { useState } from 'react'
import { useUser, SignOutButton } from '@clerk/nextjs'
import { PageHeader } from '@/components/page-header'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'

const roleColors = {
  admin: { badge: 'bg-blue-100 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
  editor: { badge: 'bg-amber-100 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  viewer: { badge: 'bg-emerald-100 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
} as const

type Role = keyof typeof roleColors

const roleLabels: Record<Role, string> = {
  admin: 'Admin',
  editor: 'Editor',
  viewer: 'Viewer',
}

export default function ProfilePage() {
  const { user, isLoaded } = useUser()
  const [role, setRole] = useState<Role>('admin')
  const [selectedRole, setSelectedRole] = useState<Role>('admin')

  const defaultNotifications = {
    dailySales: true,
    weeklyPerformance: true,
    criticalAlerts: true,
    productAlerts: false,
  }
  const [_notifications, setNotifications] = useState(defaultNotifications)
  const [pendingNotifications, setPendingNotifications] = useState(defaultNotifications)

  function fakeSave(callback: () => void) {
    toast.promise(
      new Promise<void>((resolve) => {
        setTimeout(() => {
          callback()
          resolve()
        }, 1200)
      }),
      {
        loading: 'Saving...',
        success: 'Changes saved successfully!',
        error: 'Failed to save changes.',
      }
    )
  }

  function handleSave() {
    fakeSave(() => setRole(selectedRole))
  }

  function handleNotificationsSave() {
    fakeSave(() => setNotifications(pendingNotifications))
  }

  function handlePasswordSave() {
    fakeSave(() => {})
  }

  function handleEmailSave() {
    fakeSave(() => {})
  }

  function toggleNotification(key: keyof typeof defaultNotifications) {
    setPendingNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }
  if (!isLoaded) {
    return (
      <>
        <PageHeader title="Profile" />
        <div className="flex items-center justify-center p-12">
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </>
    )
  }

  return (
    <>
      <PageHeader title="Profile" />

      <div className="space-y-6 p-6">
        {/* Profile Header */}
        <div className="flex items-center gap-6">
          <Avatar className="size-20">
            {user?.imageUrl && <AvatarImage src={user.imageUrl} alt="Profile" />}
            <AvatarFallback className="text-2xl">
              {(user?.firstName?.[0] ?? '') + (user?.lastName?.[0] ?? '')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">
              {user ? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() : 'Loading...'}
            </h2>
            <p className="text-muted-foreground">{user?.emailAddresses[0]?.emailAddress ?? ''}</p>
            <Badge
              variant="outline"
              className={`mt-2 inline-flex items-center gap-1.5 ${roleColors[role].badge}`}
            >
              <span className={`inline-block size-2 rounded-full ${roleColors[role].dot}`} />
              {roleLabels[role]}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Tabs */}
        <Tabs defaultValue="personal">
          <TabsList>
            <TabsTrigger
              value="personal"
              className="data-active:bg-blue-600 data-active:text-white"
            >
              Personal Info
            </TabsTrigger>
            <TabsTrigger value="account" className="data-active:bg-blue-600 data-active:text-white">
              Account Details
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-active:bg-blue-600 data-active:text-white"
            >
              Security
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-active:bg-blue-600 data-active:text-white"
            >
              Notifications
            </TabsTrigger>
          </TabsList>

          {/* Personal Info Tab */}
          <TabsContent value="personal" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and contact information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue={user?.firstName ?? ''} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue={user?.lastName ?? ''} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={user?.emailAddresses[0]?.emailAddress ?? ''}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      defaultValue={user?.phoneNumbers?.[0]?.phoneNumber ?? ''}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Select
                      value={selectedRole}
                      onValueChange={(val) => setSelectedRole(val as Role)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue>
                          <span
                            className={`inline-block size-2 rounded-full ${roleColors[selectedRole].dot}`}
                          />
                          {roleLabels[selectedRole]}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent alignItemWithTrigger={false}>
                        {(Object.keys(roleColors) as Role[]).map((r) => (
                          <SelectItem key={r} value={r}>
                            <span
                              className={`inline-block size-2 rounded-full ${roleColors[r].dot}`}
                            />
                            {roleLabels[r]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end">
                    <Button type="button" onClick={handleSave}>
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Details Tab */}
          <TabsContent value="account" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Plan & Membership</CardTitle>
                <CardDescription>
                  Your current subscription plan and account information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-muted-foreground text-sm">Plan</p>
                    <p className="font-medium">Professional</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Member Since</p>
                    <p className="font-medium">
                      {user?.createdAt
                        ? new Intl.DateTimeFormat('en-US', {
                            month: 'long',
                            year: 'numeric',
                          }).format(user.createdAt)
                        : '—'}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Team</p>
                    <p className="font-medium">Dining Board HQ</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Role</p>
                    <p className="flex items-center gap-2 font-medium">
                      <span className={`size-2 rounded-full ${roleColors[role].dot}`} />
                      {roleLabels[role]}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Billing Cycle</p>
                    <p className="font-medium">Monthly</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Next Billing Date</p>
                    <p className="font-medium">April 1, 2026</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Manage the card used for your subscription.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex size-10 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <line x1="2" x2="22" y1="10" y2="10" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Visa ending in 4242</p>
                      <p className="text-muted-foreground text-sm">Expires 08/2028</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
                      Current Card
                    </Badge>
                    <Dialog>
                      <DialogTrigger render={<Button variant="outline" size="sm" />}>
                        Details
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Card Details</DialogTitle>
                          <DialogDescription>
                            Information about your current payment method.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <p className="text-muted-foreground text-sm">Brand</p>
                              <p className="font-medium">Visa</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-sm">Card Number</p>
                              <p className="font-mono font-medium">**** **** **** 4242</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-sm">CVV</p>
                              <p className="font-mono font-medium">***</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-sm">Expiration Date</p>
                              <p className="font-medium">08/2028</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-sm">
                              Name on Card<span className="text-destructive">*</span>
                            </p>
                            <p className="font-medium">JOHN DOE</p>
                          </div>
                          <p className="text-muted-foreground text-xs">
                            <span className="text-destructive">*</span> Name as it appears on the
                            card.
                          </p>
                        </div>
                        <DialogFooter showCloseButton />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="button" variant="outline" onClick={() => fakeSave(() => {})}>
                    Change Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password to keep your account secure.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" placeholder="Enter new password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="button" onClick={handlePasswordSave}>
                      Update Password
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Change Email</CardTitle>
                <CardDescription>
                  Update the email address associated with your account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newEmail">New Email Address</Label>
                    <Input id="newEmail" type="email" placeholder="Enter new email address" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emailPassword">Confirm Password</Label>
                    <Input
                      id="emailPassword"
                      type="password"
                      placeholder="Enter your password to confirm"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="button" onClick={handleEmailSave}>
                      Update Email
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>
                  Choose which email notifications you&apos;d like to receive.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="text-sm font-medium">Daily Sales Report</p>
                    <p className="text-muted-foreground text-sm">
                      Receive a daily summary of sales across all units.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground text-sm">
                      {pendingNotifications.dailySales ? 'Enabled' : 'Disabled'}
                    </span>
                    <Switch
                      checked={pendingNotifications.dailySales}
                      onCheckedChange={() => toggleNotification('dailySales')}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="text-sm font-medium">Weekly Performance</p>
                    <p className="text-muted-foreground text-sm">
                      Weekly report comparing unit performance and trends.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground text-sm">
                      {pendingNotifications.weeklyPerformance ? 'Enabled' : 'Disabled'}
                    </span>
                    <Switch
                      checked={pendingNotifications.weeklyPerformance}
                      onCheckedChange={() => toggleNotification('weeklyPerformance')}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="text-sm font-medium">Critical Alerts</p>
                    <p className="text-muted-foreground text-sm">
                      Immediate alerts for revenue drops or operational issues.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground text-sm">
                      {pendingNotifications.criticalAlerts ? 'Enabled' : 'Disabled'}
                    </span>
                    <Switch
                      checked={pendingNotifications.criticalAlerts}
                      onCheckedChange={() => toggleNotification('criticalAlerts')}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="text-sm font-medium">Product Alerts</p>
                    <p className="text-muted-foreground text-sm">
                      Notifications when products underperform or go out of stock.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground text-sm">
                      {pendingNotifications.productAlerts ? 'Enabled' : 'Disabled'}
                    </span>
                    <Switch
                      checked={pendingNotifications.productAlerts}
                      onCheckedChange={() => toggleNotification('productAlerts')}
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <Button type="button" onClick={handleNotificationsSave}>
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Sign Out */}
        <div className="flex justify-end">
          <SignOutButton>
            <Button variant="outline">Sign Out</Button>
          </SignOutButton>
        </div>
      </div>
    </>
  )
}
