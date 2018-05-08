// Utility
let MatrixUtil = function() {
	let Identity =  function(dim) {
		let I = [];

		let i, j;
		for (i = 0; i < dim; i++) {
			let r = [];
			
			for (j = 0; j < dim; j++) {
				r.push((i == j)? 1: 0);
			}
			
			I.push(r)
		}
		
		return I;
	};
	
	let Clone = function(M) {
		let C = [];
		let i, j;
		
		let rc = M.length;
		for (i = 0; i < rc; i++) {
			let m = M[i];
			let r = [];
			
			let cc = m.length;
			for (j = 0; j < cc; j++) {
				r.push(m[j]);
			}
			
			C.push(r);
		}
		
		return C;
	};
	
	let Transpose = function(M) {
		let C = [];
		let i, j;
		
		let rc = M.length;
		let cc = M[0].length;
		
		for (i = 0; i < cc; i++) {
			let r = [];
			
			for (j = 0; j < rc; j++) {
				r.push(M[j][i]);
			}
			
			C.push(r);
		}
		
		return C;
	};
	
	let Sum = function(A, B) {
		let C = [];
		let i, j;
		
		let rc = A.length;
		let cc = A[0].length;

		for (i = 0; i < rc; i++) {
			let r = [];
			
			for (j = 0; j < cc; j++) {
				r.push(A[i][j] + B[i][j]);
			}
			
			C.push(r);
		}
		
		return C;
	};
	
	let Subtract =  function(A, B) {
		let C = [];
		let i, j;
		
		let rc = A.length;
		let cc = A[0].length;
		for (i = 0; i < rc; i++) {
			let r = [];
			
			for (j = 0; j < cc; j++) {
				r.push(A[i][j] - B[i][j]);
			}
			
			C.push(r);
		}
		
		return C;
	};
	
	let Multiply =  function(A, B) {
		let C = [];
		
		let rCount = A.length;
		let cCount = B[0].length;
		
		let i, j, k;
		for (i = 0; i < rCount; i++) {
			let r = [];
			let ra = A[i];
			
			for (j = 0; j < cCount; j++) {
				
				let cell = 0;
				for (k = 0; k < rCount; k++) {
					cell = cell + ra[k] * B[k][j];
				}
				
				r.push(cell);
			}
			
			C.push(r);
		}
		
		return C;
	};
	
	let Round = function(M, decimal) {
		let C = [];
		
		let rc = M.length;
		let cc = M[0].length;
		
		let i, j;
		for (i = 0; i < rc; i++) {
			let r = [];
			let rm = M[i];
			
			for (j = 0; j < cc; j++) {
				r.push(Number(rm[j].toFixed(decimal)));
			}
			
			C.push(r);
		}
		
		return C;
	};
	
	return {
		Identity: Identity,
		Clone: Clone,
		Transpose: Transpose,
		Sum: Sum,
		Subtract: Subtract,
		Multiply: Multiply,
		Round: Round
	};
}();

