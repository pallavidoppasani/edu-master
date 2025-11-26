import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Search, Filter, MoreVertical, Eye, Edit, Trash2, Award, BookOpen } from 'lucide-react';
import mockData from '@/data/mockData';

const UserManagement = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [selectedUser, setSelectedUser] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Mock users data
    const users = [
        {
            id: 1,
            name: 'Test User',
            email: 'student@edumaster.com',
            role: 'student',
            status: 'active',
            coursesEnrolled: 3,
            coursesCompleted: 1,
            createdAt: '2024-01-15',
            lastLogin: '2024-02-16',
            avatar: 'TU'
        },
        {
            id: 2,
            name: 'John Doe',
            email: 'instructor@edumaster.com',
            role: 'instructor',
            status: 'active',
            coursesCreated: 23,
            students: 12450,
            createdAt: '2023-06-10',
            lastLogin: '2024-02-15',
            avatar: 'JD'
        },
        {
            id: 3,
            name: 'Admin User',
            email: 'admin@edumaster.com',
            role: 'admin',
            status: 'active',
            createdAt: '2023-01-01',
            lastLogin: '2024-02-16',
            avatar: 'AU'
        },
        {
            id: 4,
            name: 'Jane Smith',
            email: 'jane@student.com',
            role: 'student',
            status: 'active',
            coursesEnrolled: 5,
            coursesCompleted: 2,
            createdAt: '2024-02-01',
            lastLogin: '2024-02-14',
            avatar: 'JS'
        },
        {
            id: 5,
            name: 'Mike Johnson',
            email: 'mike@instructor.com',
            role: 'instructor',
            status: 'active',
            coursesCreated: 12,
            students: 6780,
            createdAt: '2023-09-20',
            lastLogin: '2024-02-13',
            avatar: 'MJ'
        },
    ];

    // Filter users
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const handleViewUser = (user) => {
        setSelectedUser(user);
        setIsDrawerOpen(true);
    };

    const getRoleBadgeColor = (role) => {
        switch (role) {
            case 'admin': return 'bg-red-100 text-red-700';
            case 'instructor': return 'bg-blue-100 text-blue-700';
            case 'student': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">User Management</h1>
                    <p className="text-muted-foreground">Manage all platform users</p>
                </div>

                {/* Filters */}
                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Search by name or email..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={roleFilter} onValueChange={setRoleFilter}>
                                <SelectTrigger className="w-full md:w-[200px]">
                                    <Filter className="h-4 w-4 mr-2" />
                                    <SelectValue placeholder="Filter by role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Roles</SelectItem>
                                    <SelectItem value="student">Students</SelectItem>
                                    <SelectItem value="instructor">Instructors</SelectItem>
                                    <SelectItem value="admin">Admins</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Users Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Users ({filteredUsers.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Activity</TableHead>
                                    <TableHead>Joined</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-semibold">
                                                    {user.avatar}
                                                </div>
                                                <span className="font-medium">{user.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Badge className={getRoleBadgeColor(user.role)}>
                                                {user.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className="bg-green-100 text-green-700">
                                                {user.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                {user.role === 'student' && (
                                                    <span>{user.coursesEnrolled} courses</span>
                                                )}
                                                {user.role === 'instructor' && (
                                                    <span>{user.coursesCreated} courses</span>
                                                )}
                                                {user.role === 'admin' && (
                                                    <span>-</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleViewUser(user)}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button size="sm" variant="ghost">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button size="sm" variant="ghost" className="text-destructive">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* User Detail Drawer */}
                <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                    <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                        {selectedUser && (
                            <>
                                <SheetHeader>
                                    <SheetTitle>User Details</SheetTitle>
                                    <SheetDescription>
                                        Viewing information for {selectedUser.name}
                                    </SheetDescription>
                                </SheetHeader>

                                <div className="mt-6 space-y-6">
                                    {/* Profile Section */}
                                    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                                        <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-white text-2xl font-semibold">
                                            {selectedUser.avatar}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">{selectedUser.name}</h3>
                                            <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                                            <Badge className={`mt-2 ${getRoleBadgeColor(selectedUser.role)}`}>
                                                {selectedUser.role}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Account Info */}
                                    <div>
                                        <h4 className="font-semibold mb-3">Account Information</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Status:</span>
                                                <Badge className="bg-green-100 text-green-700">{selectedUser.status}</Badge>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Joined:</span>
                                                <span>{new Date(selectedUser.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Last Login:</span>
                                                <span>{new Date(selectedUser.lastLogin).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Activity Stats */}
                                    {selectedUser.role === 'student' && (
                                        <div>
                                            <h4 className="font-semibold mb-3">Learning Activity</h4>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                                                    <div className="flex items-center gap-2">
                                                        <BookOpen className="h-4 w-4 text-primary" />
                                                        <span className="text-sm">Courses Enrolled</span>
                                                    </div>
                                                    <span className="font-semibold">{selectedUser.coursesEnrolled}</span>
                                                </div>
                                                <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                                                    <div className="flex items-center gap-2">
                                                        <Award className="h-4 w-4 text-primary" />
                                                        <span className="text-sm">Courses Completed</span>
                                                    </div>
                                                    <span className="font-semibold">{selectedUser.coursesCompleted}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {selectedUser.role === 'instructor' && (
                                        <div>
                                            <h4 className="font-semibold mb-3">Teaching Activity</h4>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                                                    <div className="flex items-center gap-2">
                                                        <BookOpen className="h-4 w-4 text-primary" />
                                                        <span className="text-sm">Courses Created</span>
                                                    </div>
                                                    <span className="font-semibold">{selectedUser.coursesCreated}</span>
                                                </div>
                                                <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                                                    <div className="flex items-center gap-2">
                                                        <Award className="h-4 w-4 text-primary" />
                                                        <span className="text-sm">Total Students</span>
                                                    </div>
                                                    <span className="font-semibold">{selectedUser.students?.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="space-y-2 pt-4 border-t">
                                        <h4 className="font-semibold mb-3">Actions</h4>
                                        <Button variant="outline" className="w-full justify-start">
                                            <Edit className="h-4 w-4 mr-2" />
                                            Edit User
                                        </Button>
                                        <Button variant="outline" className="w-full justify-start">
                                            Change Role
                                        </Button>
                                        <Button variant="outline" className="w-full justify-start">
                                            Reset Password
                                        </Button>
                                        <Button variant="destructive" className="w-full justify-start">
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Delete User
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
};

export default UserManagement;
