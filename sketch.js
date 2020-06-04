let c, c1, c2;
let bird;
let ucgen = [];
let parcacik = [];
let yanUcgen;
let ekranBaslangic;
let ekranTekrar;

function resetle() {
  let rekor = bird.rekor;
  bird = new Bird();
  bird.rekor = rekor;
  yanUcgen = new yanDuvar(-1);

}

function setup() {
  createCanvas(360, 640);
  ekranBaslangic = new Ekran("Kuş", "Başlamak için\n Boşluk", "", "Muhammed\nNafiz Canıtez\n030117068", color(150, 150), color(245), true);
  ekranTekrar = new Ekran("Kuş", "", "Tekrar Oynamak için\n Boşluk", "", color(150, 150), color(245), false);
  bird = new Bird();
  yanUcgen = new yanDuvar(-1);


  //UST VE ALT DUVAR
  for (let i = 0; i < 6; i++) {
    let tempVector = [];
    let j = 60 * i;
    tempVector[0] = createVector(j, 0);
    tempVector[1] = createVector(30 + j, 30);
    tempVector[2] = createVector(60 + j, 0);
    ucgen[ucgen.length] = new Cokgen(tempVector, color(150));
  }
  for (let i = 0; i < 6; i++) {
    let tempVector = [];
    let j = 60 * i;
    tempVector[0] = createVector(j, 640);
    tempVector[1] = createVector(30 + j, 610);
    tempVector[2] = createVector(60 + j, 640);
    ucgen[ucgen.length] = new Cokgen(tempVector, color(150));
  }
}
let gravity = 0.25;

function draw() {
  background(245);
  for (let i = 0; i < parcacik.length; i++) {
    parcacik[i].draw();
  }
  for (let i = 0; i < ucgen.length; i++) {
    ucgen[i].draw();
  }
  yanUcgen.draw();
  bird.draw();

  if (ekranBaslangic.goster) {
    ekranBaslangic.draw();
  } else if (ekranTekrar.goster) {
    ekranTekrar.draw();
  } else {
    for (let i = 0; i < ucgen.length; i++) {
      if (carparCC(ucgen[i].nokta, bird.nokta())) {
        bird.kaybet();
      }
    }
    yanUcgen.carp();
  }
  
}


function keyPressed() {
  if (keyCode == 32) {
    if (ekranBaslangic.goster) {
      ekranBaslangic.goster = false;
    } else if (ekranTekrar.goster) {
      ekranTekrar.goster = false;
      resetle();
    } else {
      bird.zipla();
    }
  }
}

function mouseClicked(){
   if (ekranBaslangic.goster) {
      ekranBaslangic.goster = false;
    } else if (ekranTekrar.goster) {
      ekranTekrar.goster = false;
      resetle();
    } else {
      bird.zipla();
    }
}

class Bird {
  constructor() {
    this.puan = 0;
    this.rekor = 0;
    this.mavi = color(71, 194, 235);
    this.sari = color(255, 255, 0);
    this.beyaz = color(255, 255, 255);
    this.x = 60;
    this.y = 60;
    this.kareKenar = 30;
    this.hiz = createVector(3.5, 0);
    this.ziplamaHiz = 7;
    this.facing = 1;
  }

  draw() {
    if (!ekranBaslangic.goster && !ekranTekrar.goster) {
      this.puanGoster();
      if (carparCL(this.nokta(), 0, 0, 0, height) || carparCL(this.nokta(), width, 0, width, height)) {
        this.hiz.x *= -1;
        yanUcgen = new yanDuvar(this.facing);
        this.puan++;
      }

      if (carparCL(this.nokta(), 0, 0, width, 0) || carparCL(this.nokta(), 0, height, width, height)) {
        this.hiz.y *= -1;
      }

      this.hiz.y += gravity;
      this.x += this.hiz.x;
      this.y += this.hiz.y;
    }
    push();
    translate(this.x, this.y);
    this.facing = (this.hiz.x / abs(this.hiz.x));
    scale(this.facing, 1);
    fill(this.mavi);
    noStroke();
    rectMode(CENTER);
    rect(0, 0, this.kareKenar, this.kareKenar, 5);
    triangle(-30, -5, -10, -5, -10, 10);

    fill(this.sari);
    noStroke();
    triangle(15, -10, 15, 10, 30, 0);

    fill(this.beyaz);
    noStroke();
    circle(5, -5, 7);
    pop();


  }
  zipla() {
    this.hiz.y = 0;
    this.hiz.y -= this.ziplamaHiz;
    for (let i = 0; i < 50; i++) {
      let n = parcacik.length;
      for (let i = 0; i < parcacik.length; i++) {
        if (parcacik[i].bitti) {
          n = i;
          break;
        }
      }
      let pHiz = createVector(this.hiz.x, this.hiz.y);
      pHiz.x *= -random(-0.20, 0.80);
      pHiz.y *= random(-1.00, 0.00);
      parcacik[n] = new Parcacik(this.x, this.y, pHiz);
    }

  }
  kaybet() {
    ekranTekrar.yazi2 = "Puan: " + this.puan;
    if (this.puan > this.rekor) {
      this.rekor = this.puan;
      ekranTekrar.yazi4 = "Rekor: " + this.rekor;
    }
    ekranTekrar.goster = true;

  }
  nokta() {
    let nokta = [];

    let x = this.x;
    let y = this.y;
    let kr = this.kareKenar / 2;
    nokta[nokta.length] = createVector(x - 30, y - 5);
    nokta[nokta.length] = createVector(x - kr, y - 5);
    nokta[nokta.length] = createVector(x - kr, y - kr);
    nokta[nokta.length] = createVector(x + kr, y - kr);
    nokta[nokta.length] = createVector(x + kr, y - 10);
    nokta[nokta.length] = createVector(x + 30, y);
    nokta[nokta.length] = createVector(x + kr, y + 10);
    nokta[nokta.length] = createVector(x + kr, y + 15);
    nokta[nokta.length] = createVector(x - kr, y + 15);
    nokta[nokta.length] = createVector(x - kr, y + 5);
    return nokta;
  }
  puanGoster() {
    push();
    fill(150);
    stroke(150, 150, 0, 150);
    textAlign(CENTER);
    textSize(100);
    text(this.puan, width / 2, height / 2);
    pop();
  }
}


class Cokgen {
  constructor(vektorler, renk) {
    this.nokta = vektorler;
    this.renk = renk;
  }
  draw() {
    push();
    noStroke();
    fill(this.renk);
    beginShape();
    for (let i = 0; i < this.nokta.length; i++) {
      vertex(this.nokta[i].x, this.nokta[i].y);
    }
    endShape(CLOSE);
    pop();
  }
}

class Parcacik {
  constructor(x, y,hiz) {
    this.x = x;
    this.y = y;
    this.hiz = hiz;
    this.zaman = 70;
    this.renk = color(random(0, 255), random(0, 255), random(0, 255));
    this.bitti = false;
  }
  draw() {
    //this.hiz.y += gravity;
    this.x += this.hiz.x;
    this.y += this.hiz.y;
    this.zaman--;
    this.renk.setAlpha(this.zaman * 2);
    push();
    rectMode(CENTER);
    fill(this.renk);
    noStroke();
    translate(this.x, this.y);
    rotate(millis() / 100);
    square(0, 0, 4);
    pop();
    if (this.zaman < 0) this.bitti = true;
  }
}

class yanDuvar {
  constructor(duvar,puan) {
    this.mesafe = 20; //Ucgenler Arasi Mesafe
    this.ySinir = 50;
    this.sivriMin = 30;
    this.sivriMax = 60;
    this.uzunlukMin = 40;
    this.uzunlukMax = 80;
    this.ucgenSayisi = 1 + int((bird.puan)/5);
    if(this.ucgenSayisi > 5) {
      this.ucgenSayisi = 5;
    }
    this.ucgen = [];
    if (duvar == -1) this.sagOlustur();
    if (duvar == 1) this.solOlustur();

  }
  draw() {
    for (let i = 0; i < this.ucgen.length; i++) {
      this.ucgen[i].draw();
    }
  }
  carp() {
    for (let i = 0; i < this.ucgen.length; i++) {
      if (carparCC(this.ucgen[i].nokta, bird.nokta())) {
        bird.kaybet();
      }
    }
  }
  sagOlustur() {
    for (let i = 0; i < this.ucgenSayisi; i++) {
      let bSinir = (i) * (height) / this.ucgenSayisi;
      let sSinir = (i + 1) * (height - this.uzunlukMax) / this.ucgenSayisi;
      let bY = random(bSinir + this.ySinir, sSinir - this.ySinir); //Ucgenin ust noktasinin Y'si
      if (i != 0 && bY <= (this.ucgen[i - 1].nokta[2].y + this.mesafe)) {
        bY += (this.ucgen[i - 1].nokta[2].y + this.mesafe - bY);
      }
      let sY = bY + random(this.uzunlukMin, this.uzunlukMax); //Ucgenin alt noktasinin Y'si
      if (i == (this.ucgenSayisi - 1) && sY > (height - this.ySinir)) {
        sY -= sY - (height - this.ySinir); bY -= sY - (height - this.ySinir);
      }
      let uX = random(this.sivriMin, this.sivriMax);
      let uY = random(bY, sY);
      let tempVector = [];
      tempVector[0] = createVector(width, bY);
      tempVector[1] = createVector(width - uX, uY);
      tempVector[2] = createVector(width, sY);
      this.ucgen[i] = new Cokgen(tempVector, color(150));
    }
  }
  solOlustur() {
    for (let i = 0; i < this.ucgenSayisi; i++) {
      let bSinir = (i) * (height) / this.ucgenSayisi;
      let sSinir = (i + 1) * (height) / this.ucgenSayisi;
      let bY = random(bSinir + this.ySinir, sSinir - this.ySinir); //Ucgenin ust noktasinin Y'si
      if (i != 0 && bY <= (this.ucgen[i - 1].nokta[2].y + this.mesafe)) {
        bY += (this.ucgen[i - 1].nokta[2].y + this.mesafe - bY);
      }
      let sY = bY + random(this.uzunlukMin, this.uzunlukMax); //Ucgenin alt noktasinin Y'si
      if (i == (this.ucgenSayisi - 1) && sY > (height - this.ySinir)) {
        sY -= sY - (height - this.ySinir); bY -= sY - (height - this.ySinir);
      }
      let uX = random(this.sivriMin, this.sivriMax);
      let uY = random(bY, sY);
      let tempVector = [];
      tempVector[0] = createVector(0, bY);
      tempVector[1] = createVector(uX, uY);
      tempVector[2] = createVector(0, sY);
      this.ucgen[i] = new Cokgen(tempVector, color(150));
    }
  }
}

class Ekran {
  constructor(yazi1, yazi2, yazi3, yazi4, arkaRenk, yaziRenk, goster) {
    this.yazi1 = yazi1;
    this.yazi2 = yazi2;
    this.yazi3 = yazi3;
    this.yazi4 = yazi4;
    this.arkaRenk = arkaRenk;
    this.yaziRenk = yaziRenk;
    this.goster = goster;
  }
  draw() {
    push();
    textSize(50);
    fill(this.arkaRenk);
    rect(0, 0, width, height);
    textAlign(CENTER, CENTER);
    fill(this.yaziRenk);
    text(this.yazi1, width / 2, 100);
    text(this.yazi2, width / 2, 225);
    textSize(30);
    text(this.yazi3, width / 2, height / 2+25);
    textSize(50);
    text(this.yazi4, width / 2, height / 2 + 150);
    pop();
  }

}


function carparUN(ucgen, x, y) {
  let nk1x = ucgen.nokta[0].x;
  let nk1y = ucgen.nokta[0].y;
  let nk2x = ucgen.nokta[1].x;
  let nk2y = ucgen.nokta[1].y;
  let nk3x = ucgen.nokta[2].x;
  let nk3y = ucgen.nokta[2].y;
  let ucgenAlan = abs((nk2x - nk1x) * (nk3y - nk1y) - (nk3x - nk1x) * (nk2y - nk1y))

  let alan1 = abs((nk1x - x) * (nk2y - y) - (nk2x - x) * (nk1y - y));
  let alan2 = abs((nk2x - x) * (nk3y - y) - (nk3x - x) * (nk2y - y));
  let alan3 = abs((nk3x - x) * (nk1y - y) - (nk1x - x) * (nk3y - y));

  if (alan1 + alan2 + alan3 == ucgenAlan) {
    return true;
  }
  return false;
}



// COKGEN COKGEN
function carparCC(cokgen1, cokgen2) {
  let sonra = 0;
  for (let i = 0; i < cokgen1.length; i++) {
    sonra = i + 1;
    if (sonra == cokgen1.length) sonra = 0;

    let cg1nokta = cokgen1[i];
    let cg2nokta = cokgen1[sonra];

    let carp = carparCL(cokgen2, cg1nokta.x, cg1nokta.y, cg2nokta.x, cg2nokta.y);
    if (carp) return true;
  }

  return false;
}

// COKGEN CIZGI
function carparCL(cokgen, x1, y1, x2, y2) {
  let sonra = 0;
  for (let i = 0; i < cokgen.length; i++) {
    sonra = i + 1;
    if (sonra == cokgen.length) sonra = 0;

    let x3 = cokgen[i].x;
    let y3 = cokgen[i].y;
    let x4 = cokgen[sonra].x;
    let y4 = cokgen[sonra].y;
    let carp = carparLL(x1, y1, x2, y2, x3, y3, x4, y4);
    if (carp) {
      return true;
    }
  }
  return false;
}


// CIZGI CIZGI
function carparLL(x1, y1, x2, y2, x3, y3, x4, y4) {
  let uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
  let uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    return true;
  }
  return false;
}