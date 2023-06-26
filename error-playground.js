const sum = (a,b) => {
    if(a && b){
        return a+b;
    }
    throw new Error('invalid arguments');
}
try {
    console.log(sum(1,2));
    console.log('worked')
} catch(error){
    console.log('Error occurred');
}
