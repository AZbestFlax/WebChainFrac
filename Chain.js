﻿// Допоміжні функції
function gcd(a,b) {
	return (b)?gcd(b,a%b):a;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////========== F R A C ==========///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 k*(n+sqrt(f))/d
*/

//конструктор
function Frac(radical, term, denominator, coefficient) {
    this.n = term;      	// доданок
    this.f = radical; 		// підкореневий вираз
	this.d = denominator; 	// знаменник
	this.k = coefficient;	// коефіцієнт
}

//отримання окремих елементів дробу
Frac.prototype.getN = function() {
	return this.n;
}

Frac.prototype.getF = function() {
	return this.f;
}

Frac.prototype.getD = function() {
	return this.d;
}

Frac.prototype.getK = function() {
	return this.k;
}

Frac.prototype.toString = function() {
    return this.k + "*(" + this.n + "+V" + this.f + ")/" + this.d;
};

Frac.prototype.equalsNumber = function(value) {
    return (this.f == 0)&&
           (this.n == value)&&
           (this.d == 1)&&
           (this.k == 1);
};

Frac.prototype.equals = function(that) {
    return (this.f == that.f)&&
           (this.n == that.n)&&
           (this.d == that.d)&&
           (this.k == that.k);
}

/*  something wrong with this piece of code
// add two fracs
Frac.prototype.addFracs = function(left, right) {
	var _f = left.f*left.k*left.k;
    var _n = left.k*left.n + right*left.d;
    if (left.k<0) _n*=-1;
    var kk;
    (left.k<0)?kk=-1:kk=1;
    var tmp = new Frac(_f,_n,left.d,kk);
    tmp.simplify();
    this = tmp;
}
//*/

Frac.prototype.toInteger = function() {
	return Math.floor(this.k*(Math.sqrt(this.f)+this.n)/this.d);
} 
 
Frac.prototype.isFullSquare =function() {
	return Math.abs(Math.floor(Math.sqrt(this.f))-Math.sqrt(this.f))<1e-8;
} 

Frac.prototype.simplify =function() {
	var u;
	var _n;
	if (this.d<0) {this.d*=-1; this.k*=-1;}
//========================================== if simple frac	
        if (this.f==0) {
            _n = this.n*this.k;
            u = gcd(Math.abs(_n),Math.abs(d));
            this.n=_n/u;
            this.d/=u;
            this.k=1;
        } else {
//========================================== radiacal is full square
            if (this.isFullSquare()) {
                _n=this.k*(Math.floor(Math.sqrt(this.f))+this.n);
                this.f=0;
                u = gcd(_n,this.d);
                this.n=_n/u;
                this.d/=u;
                this.k=1;
            }
//========================================== extract from radical
            u = Math.sqrt(this.f);
            var result = 1;
			var i = 2;
            for (; i<=u; ++i) {
                if (this.f%(i*i)==0) {
                    result *= i;
                    this.f/=(i*i);
                }
            };
//========================================= extract from brackets
            u = gcd(result, Math.abs(this.n));
            this.k*=u;
            result/=u;
            this.n/=u;
            this.f*=(result*result);
//========================================= reduce
            u = gcd(Math.abs(this.k),Math.abs(this.d));
            this.k/=u;
            this.d/=u;
        }
}

Frac.prototype.converse = function() {
	var new_d = this.k*(this.f-this.n*this.n);
	var tmp = new Frac(this.f,-this.n,new_d,this.d);
	tmp.simplify();
	return tmp;
}

// попередньо визначені дробові числа 
Frac.ZERO = new Frac(0,0,1,0);
Complex.ONE = new Frac(0,1,1,1);


function mainWorkFunction() {
	var frac1 = new Frac(3,2,3,1); 
	var frac2 = new Frac(3,3,3,1);
	var frac3 = new Frac(0,0,0,0);
	frac3.addFracs(frac1, frac2);
	alert(frac3.toString());
}