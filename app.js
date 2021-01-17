const connection = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: 'ATN7U5cV',
    database: 'employees_db'
});

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    afterConnection();
});

afterConnection = () => {
    // Write a simple query that will SELECT all * from the 'employees' table
    // Log the results in the console
    //
    connection.query('SELECT * FROM employees', function (err, res) {
        if (err) throw err;
        console.log(res);

        //
        connection.end();
    });
}