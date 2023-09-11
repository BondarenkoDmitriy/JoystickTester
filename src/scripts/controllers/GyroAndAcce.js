// // let lastBeta = 0;
// // let lastGamma = 0;

// export function handleOrientation(event) {
//     const beta = event ? event.beta : 0;
//     const gamma = event ? event.gamma : 0;
  
//     const betaDiff = beta - lastBeta;
//     const gammaDiff = gamma - lastGamma;
  
//     const movementSpeed = 0.1;
//     if (Stickman.StickmanIsLoaded) {
//         Stickman.stickmanModel.position.x += gammaDiff * movementSpeed;
//         Stickman.stickmanModel.position.z += betaDiff * movementSpeed;
//     }
  
//     camera.position.x += gammaDiff * movementSpeed;
//     camera.position.z += betaDiff * movementSpeed;
  
//     lastBeta = beta;
//     lastGamma = gamma;
  
//     if (Math.abs(betaDiff) > 0.1 || Math.abs(gammaDiff) > 0.1) {
//       Stickman.isRunning = true;
//       Stickman.run();
//     } else {
//       Stickman.isRunning = false;
//       Stickman.stop();
//     }
//   }
  