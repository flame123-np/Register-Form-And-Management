/*
object function
 */

let students = [
    {
        name: 'John',
        score: 10,
        grade: 'A'
    },{
        name: 'Jane',
        score: 20,
        grade: 'A'
    },
]

let student = students.find((s) => {
    if  (s.name == 'John') {
        return true;
    }
});

let doublescore = students.map((s) => {
    s.score = s.score * 2
    return s
})

console.log('student',student);
console.log('double score',doublescore);