const { Liquibase } = require('liquibase');

const config = {
    classpath: '/Users/ayush.gupta/Downloads/mysql-connector-j-8.3.0/mysql-connector-j-8.3.0.jar',
    changeLogFile: './changelog.xml',
    url: 'jdbc:mysql://localhost:3306/liquibase_db',
    username: 'root',
    password: 'new_password',
};

const liquibase = new Liquibase(config);

function handleError(error) {
    console.error('Error:', error);
}

liquibase.validate()
    .then(() => {
        console.log('Pre-update validation successful. Proceeding with Liquibase update...');
        return liquibase.update();
    })
    .then(() => {
        console.log('Liquibase update command executed successfully.');
    })
    .catch(error => {
        handleError('Error applying changes:', error);
        liquibase.rollback({ count: 1 }) 
            .then(() => console.log('Rollback successful.'))
            .catch(rollbackError => handleError('Error during rollback:', rollbackError));
    });