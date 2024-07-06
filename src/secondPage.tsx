import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import axios from 'axios';
import { Container, Checkbox, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface Post {
userId: number;
id: number;
title: string;
body: string;
}

interface Department {
name: string;
subDepartments: string[];
}

const columns: GridColDef[] = [
{ field: 'id', headerName: 'ID', width: 70 },
{ field: 'title', headerName: 'Title', width: 300 },
{ field: 'body', headerName: 'Body', width: 600 },
];

const departments: Department[] = [
{
    name: 'Customer Service',
    subDepartments: ['Support', 'Customer Success']
},
{
    name: 'Design',
    subDepartments: ['Graphic Design', 'Graphic Design', 'product Design']
},
{
    name: 'Agriculture & Fishing',
    subDepartments: ['Agriculture', 'Crops', 'Farming Animals & Livestock', 'Fishery & Aquaculture', 'Ranching']
},
{
    name: 'Business Services',
    subDepartments: ['Accounting & Accounting Services', 'Auctions', 'Business Services- General', 'Career Planning', 'Career']
}
];

const DepartmentList: React.FC = () => {
const [open, setOpen] = useState<{ [key: string]: boolean }>({});
const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

const handleToggle = (department: string) => {
    setOpen((prevOpen) => ({ ...prevOpen, [department]: !prevOpen[department] }));
};

const handleSelect = (department: string, isSubDepartment: boolean = false) => {
    setSelected((prevSelected) => {
    const newSelected = { ...prevSelected, [department]: !prevSelected[department] };
    if (!isSubDepartment) {
        departments
        .find((dept) => dept.name === department)?.subDepartments
        .forEach((subDept) => {
            newSelected[subDept] = newSelected[department];
        });
    } else {
        const parentDepartment = departments.find((dept) => dept.subDepartments.includes(department));
        if (parentDepartment) {
        const allSelected = parentDepartment.subDepartments.every((subDept) => newSelected[subDept]);
        newSelected[parentDepartment.name] = allSelected;
        }
    }
    return newSelected;
    });
};

return (
    <List>
    {departments.map((department) => (
        <React.Fragment key={department.name}>
        <ListItem button onClick={() => handleToggle(department.name)}>
            <ListItemIcon>
            <Checkbox
                edge="start"
                checked={selected[department.name] || false}
                tabIndex={-1}
                disableRipple
                onClick={() => handleSelect(department.name)}
            />
            </ListItemIcon>
            <ListItemText primary={department.name} />
            {open[department.name] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open[department.name]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            {department.subDepartments.map((subDepartment) => (
                <ListItem key={subDepartment} button style={{ paddingLeft: 32 }}>
                <ListItemIcon>
                    <Checkbox
                    edge="start"
                    checked={selected[subDepartment] || false}
                    tabIndex={-1}
                    disableRipple
                    onClick={() => handleSelect(subDepartment, true)}
                    />
                </ListItemIcon>
                <ListItemText primary={subDepartment} />
                </ListItem>
            ))}
            </List>
        </Collapse>
        </React.Fragment>
    ))}
    </List>
);
};

const SecondPage: React.FC = () => {
const [data, setData] = useState<Post[]>([]);
const [loading, setLoading] = useState(true);
const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 5,
    page: 0,
});
const navigate = useNavigate();

useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    if (!userDetails) {
    navigate('/?error=true');
    return;
    }

    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
        setData(response.data);
        setLoading(false);
    });
}, [navigate]);

return (
    <Container className='text-center'>
    <h1 style={{textAlign: 'center'}}>Second Page</h1>
    <div  style={{ height: 400, width: '100%'}}>
        <DataGrid
        rows={data}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={
            (model) => setPaginationModel(model)
        }
        loading={loading}
        sx={{
            '& .MuiDataGrid-cell': {
                borderColor: '#0e100f',
            },
            '& .MuiDataGrid-columnHeaders': {
                borderColor: '#0e100f',
            },
            '& .MuiDataGrid-footerContainer': {
                borderTop: '1px solid #0e100f',
            },
        }}
        />
    </div>
    <h1 style={{textAlign: 'center'}}>Departments</h1>
    <DepartmentList />
    </Container>
);
};

export default SecondPage;
