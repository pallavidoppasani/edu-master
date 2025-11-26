import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
import { Search, Download, Mail, Filter } from 'lucide-react';
import { toast } from "sonner";

const StudentProgress = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [courseFilter, setCourseFilter] = useState('all');

    // Mock student data
    const students = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            course: 'Introduction to React',
            enrolled: '2024-01-15',
            progress: 85,
            lessonsCompleted: 17,
            totalLessons: 20,
            quizScore: 92,
            lastActive: '2 hours ago',
            status: 'active'
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            course: 'Advanced Node.js',
            enrolled: '2024-01-20',
            progress: 60,
            lessonsCompleted: 12,
            totalLessons: 20,
            quizScore: 85,
            lastActive: '1 day ago',
            status: 'active'
        },
        {
            id: 3,
            name: 'Mike Johnson',
            email: 'mike@example.com',
            course: 'Introduction to React',
            enrolled: '2024-02-01',
            progress: 100,
            lessonsCompleted: 20,
            totalLessons: 20,
            quizScore: 95,
            lastActive: '3 hours ago',
            status: 'completed'
        },
        {
            id: 4,
            name: 'Sarah Williams',
            email: 'sarah@example.com',
            course: 'Full Stack Development',
            enrolled: '2024-01-10',
            progress: 45,
            lessonsCompleted: 9,
            totalLessons: 20,
            quizScore: 78,
            lastActive: '5 days ago',
            status: 'inactive'
        },
        {
            id: 5,
            name: 'David Brown',
            email: 'david@example.com',
            course: 'Advanced Node.js',
            enrolled: '2024-02-05',
            progress: 30,
            lessonsCompleted: 6,
            totalLessons: 20,
            quizScore: 88,
            lastActive: '12 hours ago',
            status: 'active'
        },
    ];

    const courses = ['Introduction to React', 'Advanced Node.js', 'Full Stack Development'];

    // Filter students
    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCourse = courseFilter === 'all' || student.course === courseFilter;
        return matchesSearch && matchesCourse;
    });

    const getStatusBadge = (status) => {
        if (status === 'completed') {
            return <Badge className="bg-green-100 text-green-700">Completed</Badge>;
        } else if (status === 'active') {
            return <Badge className="bg-blue-100 text-blue-700">Active</Badge>;
        }
        return <Badge className="bg-gray-100 text-gray-700">Inactive</Badge>;
    };

    const handleExport = () => {
        toast.info('Exporting student data...');
    };

    const handleSendMessage = (studentId) => {
        toast.info(`Sending message to student ${studentId}`);
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto p-8">
                {/* Header */}
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Student Progress</h1>
                        <p className="text-muted-foreground">Track student performance across all courses</p>
                    </div>
                    <Button variant="outline" onClick={handleExport}>
                        <Download className="h-4 w-4 mr-2" />
                        Export Data
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">Total Students</p>
                                <p className="text-3xl font-bold">{students.length}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">Active Students</p>
                                <p className="text-3xl font-bold text-blue-600">
                                    {students.filter(s => s.status === 'active').length}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">Completed</p>
                                <p className="text-3xl font-bold text-green-600">
                                    {students.filter(s => s.status === 'completed').length}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">Avg. Progress</p>
                                <p className="text-3xl font-bold">
                                    {Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length)}%
                                </p>
                            </div>
                        </CardContent>
                    </Card>
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
                            <Select value={courseFilter} onValueChange={setCourseFilter}>
                                <SelectTrigger className="w-full md:w-[250px]">
                                    <Filter className="h-4 w-4 mr-2" />
                                    <SelectValue placeholder="Filter by course" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Courses</SelectItem>
                                    {courses.map(course => (
                                        <SelectItem key={course} value={course}>{course}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Students Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Students ({filteredStudents.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student</TableHead>
                                    <TableHead>Course</TableHead>
                                    <TableHead>Progress</TableHead>
                                    <TableHead>Lessons</TableHead>
                                    <TableHead>Quiz Score</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Last Active</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredStudents.map((student) => (
                                    <TableRow key={student.id}>
                                        <TableCell>
                                            <div>
                                                <p className="font-medium">{student.name}</p>
                                                <p className="text-sm text-muted-foreground">{student.email}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-sm">{student.course}</p>
                                        </TableCell>
                                        <TableCell>
                                            <div className="w-32">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-sm font-medium">{student.progress}%</span>
                                                </div>
                                                <Progress value={student.progress} />
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm">
                                                {student.lessonsCompleted}/{student.totalLessons}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm font-semibold">{student.quizScore}%</span>
                                        </TableCell>
                                        <TableCell>{getStatusBadge(student.status)}</TableCell>
                                        <TableCell>
                                            <span className="text-sm text-muted-foreground">{student.lastActive}</span>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => handleSendMessage(student.id)}
                                            >
                                                <Mail className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default StudentProgress;
