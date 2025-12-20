// const products = [
//     { id: 1, productName: 'Laptop', stock: 5 },
//     { id: 2, productName: 'Smartphone', stock: 0 },
//     { id: 3, productName: 'Headphones', stock: 10 },
//     { id: 4, productName: 'Keyboard', stock: 3 },
//     { id: 5, productName: 'Monitor', stock: 0 },
//     { id: 6, productName: 'Mouse', stock: 7 },
//   ];
  
//   function Stock() {
//     return (
//       <div className="p-4">
//         <h2 className="text-xl font-bold mb-4">Available Products</h2>
//         <ul className="space-y-2">
//           {products
//             .filter(product => product.stock > 0)
//             .map(product => (
//               <li
//                 key={product.id}
//                 className="p-3 bg-green-100 rounded-md shadow-md"
//               >
//                 {product.productName} — Stock: {product.stock}
//               </li>
//             ))}
//         </ul>
//       </div>
//     );
//   }
  
//   export default Stock;
  


const products = [
    { id: 1, productName: 'Laptop', stock: 5, active: true },
    { id: 2, productName: 'Smartphone', stock: 0, active: false },
    { id: 3, productName: 'Headphones', stock: 10, active: true },
    { id: 4, productName: 'Keyboard', stock: 3, active: true },
    { id: 5, productName: 'Monitor', stock: 0, active: false },
    { id: 6, productName: 'Mouse', stock: 7, active: true },
  ];

  
  function Stock() {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Available Products</h2>
       
          {products.map(product => (
            product.active && product.stock > 0 ? (
              <div
                key={product.id}
                className="p-3"
              >
                {product.productName} — Stock: {product.stock}
              </div>
            ) : null
          ))}
       
      </div>
    );
  }
  
  export default Stock;
  