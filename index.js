// // import File from "./src/fs/file.js";

// // async function main() {
// // 	const path = "C:/Users/Uberaupe01/Documents/JData/dt";
// // 	const name = "teste";

// // 	const f = new File(path, name);

// // 	const obj = {
// // 		name: "aaaa",
// // 		age: 51,
// // 	};

// // 	try {
// // 		try {
// // 			await f.save(obj);
// // 		} catch (error) {
// // 			console.log(error);
// // 		}
// // 		const data = await f.read();
// //     data[1] = obj;
// //     data[2] = obj;
// // 		console.log(data);
// //     await f.update(data);
// // 		const newD = await f.read();
// // 		console.log(newD);
// // 	} catch (err) {
// // 		console.log(err);
// // 	}
// // }

// // main();

// const data = {
// 	1: { nome: "gabriel", idade: 40 },
// 	2: { nome: "lucas", idade: 37 },
// 	3: { nome: "roberta", idade: 40 },
// 	4: { nome: "gabriel", idade: 24 },
// };

// const obj = { nome: "gabriel", idade: 40 };
// const method = "deep";

// let list = {};
// for (const key in data) {
// 	for (const valor in data[key]) {
// 		if (obj.hasOwnProperty(valor)) {
// 			if (method === "deep") {
// 				for (const k in obj) {
// 					if (obj[k] === data[key][valor]) {
// 						console.log(obj[k]);
// 						list[key] = data[key];
// 					}
// 				}
// 			} else {
// 				if (obj[valor] === data[key][valor]) {
// 					list[key] = data[key];
// 				}
// 			}
// 		}
// 	}
// }

// console.log(list);

// function find(obj, data, method = null) {
//     const pro = (resolve, reject) => {
//       let result = {};
//       if (method === 'deep') {
//         for (const key in data) {
//           for (const valor in data[key]) {
//             if (obj.hasOwnProperty(valor)) {
//               if (obj[valor] === data[key][valor]) {
//                 result[key] = data[key];
//               }
//             }
//           }
//         }
//       } else if (method === null) {
//         for (const key in data) {
//           let match = true;
//           for (const prop in obj) {
//             if (data[key][prop] !== obj[prop]) {
//               match = false;
//               break;
//             }
//           }
//           if (match) {
//             result[key] = data[key];
//           }
//         }
//       }
//       resolve(result)
//     }
//     return new Promise(pro);
// 	}

// const property = { nome: "gabriel", idade: 40 };
// const resultDeep = find(property, data, "deep");
// const resultNull = find(property, data);

// console.log("Result Deep:", resultDeep);
// console.log('/////////////////////////////////////')
// console.log("Result Null:", resultNull);

// // // // // // // // // // // // // // // // // // // // // // // // asa

import Model from "./src/collection/collection.js";
import File from "./src/fs/file.js";

const path = "C:/Users/Uberaupe01/Documents/JData/dt";
const name = "teste";

const f = new File(path, name);

// const data = {
// 	1: { nome: "gabriel", idade: 40 },
// 	2: { nome: "lucas", idade: 37 },
// 	3: { nome: "roberta", idade: 40 },
// 	4: { nome: "gabriel", idade: 24 },
// 	5: { nome: "gabriel", idade: 40 },
// };

// f.save(data);

const m = new Model(name, path);
const obj = { nome: "gabriel", idade: 40, comida: "pizza" };

try {
	const data = await m.getAll();
	const b = await m.findAll(obj);
	const a = await m.findExactly(obj);

	console.log(data);
	const newD = { altura: 5.1 };
	const newg = { comida: "pizza" };
	for (const key in data) {
		if (parseInt(key) > 0) {
			data[key] = { ...data[key], ...newD };
		}
		if (parseInt(key) > 3) {
			data[key] = { ...data[key], ...newg };
		}
	}

	f.update(data)

	console.log(data);
	console.log(a);
	console.log(b);
} catch (error) {
	console.log(error);
}
