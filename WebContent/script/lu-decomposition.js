let LU = function() {
	let self = this;
	
	let getMaxEntry = function(cIdex) {
		let U = self.U;
		let maxIdex = cIdex, max = Math.abs(U[cIdex][cIdex]);
		let dim = A.length, i;
		
		for (i = cIdex + 1; i < dim; i++) {
			let next = Math.abs(U[i][cIdex]);
			if (next > max) {
				max = next;
				maxIdex = i;
			}
		}
		
		return maxIdex;
	};
	
	let pivot = function(p, n) {
		let dim = self.A.length;
		let U = self.U, L = self.L, P = self.P;
		
		let temp, i;
		// U
		for (i = p; i < dim; i++) {
			temp = U[p][i]; U[p][i] = U[n][i]; U[n][i] = temp;
		}
		
		// L
		for (i = 0; i < p; i++) {
			temp = L[p][i]; L[p][i] = L[n][i]; L[n][i] = temp;
		}
		
		// P
		temp = P[p]; P[p] = P[n]; P[n] = temp;
	};
	
	let eliminate = function(p) {
		let dim = self.A.length;
		let U = self.U, L = self.L;
		let i, j;
		
		for (i = p + 1; i < dim; i++) {
			let l = U[i][p] / U[p][p];
			L[i][p] = l;
			
			for (j = p; j < dim; j++) {
				U[i][j] = U[i][j] - l * U[p][j];
			}
		}
		
	};
	
	let setA = function(A) {
		// A is a square matrix
		let dim = A.length;
		
		self.A = A;
		self.U = MatrixUtil.Clone(A);
		self.L = MatrixUtil.Identity(dim);
		self.P = MatrixUtil.Identity(dim);
		
		return self;
	};
	
	let PLU = function() {
		let A = self.A;
		let dim = A.length;
		
		let i, j, k;
		for (i = 0; i < dim - 1; i++) {
			// Find the max entry
			let maxIdex = getMaxEntry(i);
			
			// Pivoting
			if (i != maxIdex) {
				pivot(i, maxIdex);
			}
			
			// Eliminate
			eliminate(i);
		}
	};
	
	let solve = function(B) {
		let dim = self.A.length;
		let P = self.P;
		let L = self.L;
		let U = self.U;
		
		let PB = MatrixUtil.Multiply(P, B);
		
		let i, j;
		
		//LUX = PB
		//UX = Y ==> LY = PB
		let Y = [];
		for (i = 0; i < dim; i++) {
			let l = L[i];
			
			let temp = 0;
			for (j = 0; j < i; j++) {
				temp = temp + l[j] * Y[j][0];
			}
			
			Y.push([PB[i][0] - temp]);
		}
		
		// UX = Y
		let X = [];
		for (i = dim - 1; i >= 0; i--) {
			let u = U[i];
			
			let start = i + 1;
			let temp = 0;
			for (j = start; j < dim; j++) {
				temp = temp + u[j] * X[j - start];
			}
			
			X.unshift([(Y[i][0] - temp)/u[i]]);
		}
		
		return X;
	};
	
	// Public methods
	self.SetA = setA;
	self.PLU = PLU;
	self.Solve = solve;
};