const fs = require('fs');
const { resolve } = require('path');

var employees, departments; // declaring global emp and depart variables

// In the below function, employees and departments var will be populated if the files are readable
exports.initialize = () => {
    fs.readFile('./data/employees.json', (err, data) => {
        if (err) reject("Failure to read file employees.json!");
        employees = JSON.parse(data);
    })

    fs.readFile('./data/departments.json', (err, data) => {
        if (err) reject("Failure to read file departments.json!");
        departments = JSON.parse(data)
    })

    return new Promise((resolve, reject) => {
        if (!fs) {
            reject("unable to read the file");
        }
        else {
            resolve("Success!!");
        }
    })
}

// Getting all of the employees
exports.getAllEmployees = () => {
    return new Promise((resolve, reject) => {
        if (employees.length == 0) {
            reject("no results returned");
        }
        else {
            resolve(employees);
        }
    })
}

// Getting all of the managers among employees
exports.getManagers = () => {
    return new Promise((resolve, reject) => {
        if (employees.length === 0) {
            reject('no results returned');
        }
        else {
            let all_manag = [];
            for (let i = 0; i < employees.length; i++)
                if (employees[i].isManager === true)
                    all_manag.push(employees[i])
            resolve(all_manag);
        }
    })
}

// Getting all the departments
exports.getDepartments = () => {
    return new Promise((resolve, reject) => {
        if (departments.length === 0) {
            reject('no results returned');
        }
        else {
            resolve(departments);
        }
    })
}

exports.addEmployee = (empData) => {
    return new Promise((res, rej) => {
        if (empData.isManager == undefined) {
            empData.isManager = false;
        }
        else {
            empData.isManager = true;
        }
        empData.employeeNum = employees.length + 1;
        employees.push(empData);
        res();
    })
}

exports.getEmployeesByStatus = (status) => {
    return new Promise((res, rej) => {
        let status_emp = [];
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].status == status) {
                status_emp.push(employees[i]);
            }
        }
        if (status_emp.length != 0) {
            res(status_emp);
        }
        else {
            rej("NO employee found with such status");
        }
    })
}

exports.getEmployeesByDepartment = (department) => {
    return new Promise((res, rej) => {
        let depart_emp = [];
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].department == department) {
                depart_emp.push(employees[i]);
            }
        }
        if (depart_emp.length != 0) {
            res(depart_emp);
        }
        else {
            rej("NO employee found with such department");
        }
    })
}

exports.getEmployeesByManager = (manager) => {
    return new Promise((res, rej) => {
        let manager_emp = [];
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].employeeManagerNum == manager) {
                manager_emp.push(employees[i]);
            }
        }
        if (manager_emp.length != 0) {
            res(manager_emp);
        }
        else {
            rej("NO employee found with such ManagerNum");
        }
    })
}

exports.getEmployeeByNum = (num) => {
    return new Promise((res, rej) => {
        let emp;
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].employeeNum == num) {
                emp = employees[i];
            }
        }
        if (emp == undefined) {
            rej("No results returned");
        }
        else {
            res(emp);
        }
    })
}

exports.updateEmployee = (employeeData) => {
    return new Promise((res, rej) => {
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].employeeNum == employeeData.employeeNum) {
                employees[i] = employeeData;
            }
        }
        res();
    })
}