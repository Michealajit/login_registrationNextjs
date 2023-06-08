const mongoose = require("mongoose");


async function dbConnect() {
   

    await mongoose.connect('mongodb+srv://Micheal-Ajit:michealajitajit@cluster0.zmhnw.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Connected to MongoDB');
        // Proceed with your code logic or additional database operations
      })
      .catch((error) => {
        console.error('Failed to connect to MongoDB:', error.message);
      });

   
}

export default dbConnect;

