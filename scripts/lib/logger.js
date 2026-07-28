class Logger {

    info(message) {

        console.log(

            "[INFO]",

            message

        );

    }

    warning(message) {

        console.log(

            "[WARN]",

            message

        );

    }

    error(message) {

        console.log(

            "[ERROR]",

            message

        );

    }

    success(message) {

        console.log(

            "[PASS]",

            message

        );

    }

}

module.exports = new Logger();