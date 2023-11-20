

const fileInput = document.querySelector("#fileInput")
const pieChart = document.querySelector("canvas").getContext("2d");
/*
const data = [
    {parti: "Arbeiderpartiet", ordforere: 111, fyllfarge: "#FF0000"},
    {parti: "Høyre", ordforere: 102, fyllfarge: "#00FF00"},
    {parti: "Senterpartiet", ordforere:87, fyllfarge: "#FFFF00"},
    {parti: "Frp", ordforere: 14, fyllfarge: "#0000FF"},
    {parti: "Krf", ordforere: 12, fyllfarge: "#00FFFF"}
];
*/ 

function makeDiagram(data) {
    const dataLen = data.length;
    let ordfoerereSum = 0;

    data.forEach(element => {
        ordfoerereSum += element.ordforere
    });

    console.log(ordfoerereSum);

    let sumGrader = 0;
    
    for (elementVerdi of data) {

        const sektorGrader = (elementVerdi.ordforere / ordfoerereSum) * 2 * Math.PI;
        console.log(`sektor ${elementVerdi['parti']} er ${sektorGrader}`);
        pieChart.beginPath();
        pieChart.arc(100, 100, 100, sumGrader, sumGrader + sektorGrader);
        sumGrader += sektorGrader;
        pieChart.lineTo(100, 100);
        pieChart.fillStyle = elementVerdi.color;
        pieChart.fill();

    }

}



function makeData(file) {

    const data = file.trim().split(/\r?\n/).map(val => {
        const arr = val.split(";")
        return {parti: arr[0], ordforere: Number(arr[1]), color: arr[2]}
    })
    
    makeDiagram(data)

}

fileInput.onchange = () => {

    const file = fileInput.files[0]
    const fr = new FileReader()

    fr.onload = () => makeData(fr.result)

    fr.readAsText(file)
}