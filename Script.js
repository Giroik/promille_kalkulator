AllDrinks={
    lettol:["lettøl",0.025],
    pils:["lettol",0.045],
    rusbrus:["lettol",0.047],
    vin:["lettol",0.12],
    vodka:["lettol",0.40],
    anetLiter:["anetLiter",0]
}
let sumertPromiler=0
document.querySelector("#Tele").onclick = function(evn)
{
    if(document.getElementById("vekt").value==0)
    {
        alert("Skriv inn vekt")
        return;
    }
    document.getElementById("resInfo").innerHTML=""
    let Names=["lettol","pils","rusbrus","vin","vodka","anetLiter"];
    AllDrinks["anetLiter"][1]=Number(document.getElementById("anet").value/100).toFixed(2)
    let gram=0
    for(let i=0; i < Names.length;i++)
    {
        console.log(document.getElementById(Names[i]).value,AllDrinks[Names[i]][1])
        gram+=Number(document.getElementById(Names[i]).value)*AllDrinks[Names[i]][1]*0.78
    }
    gram=gram*1000
    //////
    let date1=document.getElementById("timeStart").value
    let val1=date1.split(":");
    let hrs1= +val1[0]
    let min1= +val1[1]
    min1+=hrs1*60
    //////
    let date2=document.getElementById("timeStop").value
    let val2=date2.split(":");
    let hrs2= +val2[0]
    let min2= +val2[1]
    min2+=hrs2*60
    //////
    let antalHalvtimer
    if(min2>min1)
    {
        antalHalvtimer =(min2-min1)/30
    }
    else if(min2<min1)
    {
        antalHalvtimer=((24*60-min1)+min2)/30
    }

    if(min2-min1==0)
    {
        alert("den minste defiransen må være 30 minuter")
        return;
    }
    //////

    let konstativTal=0

    if(document.getElementById("Male").checked)
    {
        sumertPromiler=((gram/(Number(document.getElementById("vekt").value)*0.7))-(0.15*0.5*antalHalvtimer))
        konstativTal=0.7
        if(sumertPromiler<0)
        {
            document.getElementById("resInfo").innerHTML="<h2>Alkohol er burte</h2>"
        }

    }
    else if(document.getElementById("Femail").checked)
    {
        sumertPromiler=((gram/(Number(document.getElementById("vekt").value)*0.6))-(0.15*0.5*antalHalvtimer))
        konstativTal=0.6
        if(sumertPromiler<0)
        {
            document.getElementById("resInfo").innerHTML="<h2>Alkohol er burte</h2>"
        }
    }
    else
    {
        alert("du må velge 'Male' eller 'Femail'")
        return;
    }
    if(sumertPromiler>4)
    {
        alert("dø dose av alkohol er 4-6 promiller, du har: "+sumertPromiler+" du er i risiko")
        if(sumertPromiler>8)
        {
            alert("det er ikke mulig å leve med sån dose av alkohol")
            return;
        }
    }
    let sumertPromiler2=0
    let a=0
    ////////////////////////////////////////////////////////////////////////
    while (sumertPromiler>=0)
    {

        a++
        if(antalHalvtimer>=a)
        {
            sumertPromiler=(a/antalHalvtimer)*((gram/(Number(document.getElementById("vekt").value)*konstativTal))-(0.15*0.5*antalHalvtimer))
            console.log(sumertPromiler)
        }
        else if(antalHalvtimer<a)
        {
            sumertPromiler=((gram/(Number(document.getElementById("vekt").value)*konstativTal))-(0.15*0.5*a))
            console.log(sumertPromiler)

        }
        ///////////Skriv ut
        let timerr=(min1/60).toFixed(0)
        let minuter=((min1+30)%60)
        min1+=30

        if(min1>=60*24)
        {
            min1=0
            timerr=0
            minuter=minuter%30
        }
        if(minuter==0)
        {
            minuter="00";
        }
        let divEl=document.createElement("div");
        let pEl=[document.createElement("p"),document.createElement("p"),document.createElement("p")]

        let trust=""
        if(sumertPromiler>sumertPromiler2)
        {
            trust="Opp"
        }
        if(sumertPromiler<sumertPromiler2)
        {
            trust="Ned"
        }
        let allInfo
        if(sumertPromiler>=0) {
            allInfo=["Time: "+ String(timerr)+":" + String(minuter), sumertPromiler.toFixed(2)+" Promiler", trust]
        }
        else if(sumertPromiler<=0)
        {
            allInfo=["Time: "+ String(timerr)+":" + String(minuter), "0.00"+" Promiler", trust]
        }
        sumertPromiler2=sumertPromiler
        for(let i =0;i<3;i++)
        {
            pEl[i].className="pElement"
            pEl[i].innerHTML=allInfo[i];
            divEl.appendChild(pEl[i]);
            divEl.className="infoDiv"
        }
        document.getElementById("resInfo").appendChild(divEl)
    }
}


