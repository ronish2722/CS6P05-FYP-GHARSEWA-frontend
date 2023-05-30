// import { payOrder } from "../actions/bookAction"; // Import payOrder action
// import myKey from "./KhaltiKey";

// const KhaltiConfig = (dispatch, postId, post) => {
//   const successPaymentHandler = (paymentResult) => {
//     dispatch(
//       payOrder(postId, {
//         paymentMethod: "khalti",
//         paymentResult: {
//           token: paymentResult.token,
//         },
//       })
//     );
//   };

//   return {
//     // ...other config properties
//     publicKey: "test_public_key_c8ce2a3704974cad8386721146712d1a",
//     productIdentity: "123454321",
//     productName: "GharSewa",
//     productUrl: "http://localhost:3000/",
//     eventHandler: {
//       onSuccess(payload) {
//         // hit merchant api for initiating verfication
//         console.log("Payment Sucessful!");
//         console.log(payload);
//         successPaymentHandler(payload);
//       },
//       // onError handler is optional
//       onError(error) {
//         // handle errors
//         console.log(error);
//       },
//       onClose() {
//         console.log("widget is closing");
//       },
//     },
//     paymentPreference: [
//       "KHALTI",
//       "EBANKING",
//       "MOBILE_BANKING",
//       "CONNECT_IPS",
//       "SCT",
//     ],
//   };
// };

// export default KhaltiConfig;
