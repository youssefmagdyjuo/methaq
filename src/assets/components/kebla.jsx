"use client";

import { useState, useEffect } from "react";
import { useGeolocation } from "react-use";

const KaabaCoordinates = { lat: 21.4225, lng: 39.8262 };

const QiblaCompass = () => {
    const { latitude, longitude, error: geoError } = useGeolocation();
    const [qiblaAngle, setQiblaAngle] = useState(0);
    const [deviceAngle, setDeviceAngle] = useState(0);
    const [hasPermission, setHasPermission] = useState(false);

    // Request device orientation permission
    const requestPermission = async () => {
        if (typeof DeviceOrientationEvent?.requestPermission === 'function') {
            try {
                const permission = await DeviceOrientationEvent.requestPermission();
                setHasPermission(permission === 'granted');
            } catch (error) {
                console.error('Error requesting orientation permission:', error);
            }
        } else {
            setHasPermission(true); // For devices that don't need permission
        }
    };

    useEffect(() => {
        if (latitude && longitude) {
            setQiblaAngle(getQiblaDirection(latitude, longitude));
        }
    }, [latitude, longitude]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleOrientation = (event) => {
            setDeviceAngle(event.alpha || 0);
        };

        if (hasPermission) {
            window.addEventListener("deviceorientation", handleOrientation);
        }

        return () => {
            window.removeEventListener("deviceorientation", handleOrientation);
        };
    }, [hasPermission]);

    const getQiblaDirection = (lat, lng) => {
        const φ1 = (lat * Math.PI) / 180;
        const φ2 = (KaabaCoordinates.lat * Math.PI) / 180;
        const Δλ = ((KaabaCoordinates.lng - lng) * Math.PI) / 180;

        const y = Math.sin(Δλ);
        const x = Math.cos(φ1) * Math.tan(φ2) - Math.sin(φ1) * Math.cos(Δλ);

        let angle = (Math.atan2(y, x) * 180) / Math.PI;
        return (angle + 360) % 360;
    };

    if (geoError) {
        return <div>Error accessing location: {geoError.message}</div>;
    }

    if (!hasPermission) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <button onClick={requestPermission}>
                    Enable Compass Access
                </button>
            </div>
        );
    }

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>اتجاه القبلة</h2>
            <div
                style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    border: "5px solid black",
                    position: "relative",
                    margin: "auto",
                    background: "white",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "2px",
                        background: "red",
                        top: "50%",
                        transform: `rotate(${qiblaAngle - deviceAngle}deg)`,
                        transformOrigin: "center",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: "10px",
                        width: "100%",
                        textAlign: "center",
                        color: "black",
                    }}
                >
                    N
                </div>
            </div>
            {latitude && longitude ? (
                <p>
                    Your location: {latitude.toFixed(4)}, {longitude.toFixed(4)}
                </p>
            ) : (
                <p>Acquiring location...</p>
            )}
        </div>
    );
};

export default QiblaCompass;
// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";

// const KAABA_LAT = 21.4225;
// const KAABA_LON = 39.8262;

// function toRadians(deg) {
// return deg * (Math.PI / 180);
// }

// function getQiblaDirection(lat, lon) {
// const φ1 = toRadians(lat);
// const φ2 = toRadians(KAABA_LAT);
// const Δλ = toRadians(KAABA_LON - lon);

// const y = Math.sin(Δλ) * Math.cos(φ2);
// const x =
//     Math.cos(φ1) * Math.sin(φ2) -
//     Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
// const θ = Math.atan2(y, x);

// return (θ * 180) / Math.PI;
// }

// export default function QiblaCompass() {
// const [direction, setDirection] = useState(0);
// const [qiblaAngle, setQiblaAngle] = useState(0);
// const [hasPermission, setHasPermission] = useState(false);

// const requestPermission = async () => {
//     if (typeof DeviceOrientationEvent?.requestPermission === "function") {
//     try {
//         const permission = await DeviceOrientationEvent.requestPermission();
//         setHasPermission(permission === "granted");
//     } catch (error) {
//         console.error("Error requesting orientation permission:", error);
//     }
//     } else {
//     setHasPermission(true);
//     }
// };

// useEffect(() => {
//     navigator.geolocation.getCurrentPosition((pos) => {
//     const { latitude, longitude } = pos.coords;
//     const angle = getQiblaDirection(latitude, longitude);
//     setQiblaAngle(angle);
//     });

//     const handleOrientation = (event) => {
//     if (event.alpha !== null) {
//         const compassHeading = 360 - event.alpha;
//         const angle = qiblaAngle - compassHeading;
//         setDirection(angle);
//     }
//     };

//     if (hasPermission) {
//     window.addEventListener("deviceorientationabsolute", handleOrientation, true);
//     window.addEventListener("deviceorientation", handleOrientation, true);
//     }

//     return () => {
//     window.removeEventListener("deviceorientationabsolute", handleOrientation);
//     window.removeEventListener("deviceorientation", handleOrientation);
//     };
// }, [qiblaAngle, hasPermission]);

// if (!hasPermission) {
//     return (
//     <div className="flex items-center justify-center min-h-screen">
//         <button
//         onClick={requestPermission}
//         className="px-4 py-2 bg-teal-500 text-white rounded"
//         >
//         Enable Compass Access
//         </button>
//     </div>
//     );
// }

// return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-teal-200 to-teal-500 text-center">
//     <h1 className="text-4xl font-bold mb-8 text-teal-900">القبلة</h1>

//     <div className="relative w-60 h-60 rounded-full border-4 border-teal-800 shadow-lg">
//         <div
//         className="absolute top-1/2 left-1/2 w-1 h-28 bg-red-600 origin-bottom"
//         style={{ transform: `rotate(${direction}deg) translate(-50%, -100%)` }}
//         />
//         <Image
//         src="/images/mosque.svg" // تأكد أن الصورة موجودة في public/images
//         alt="Mosque silhouette"
//         layout="fill"
//         className="opacity-10" // يمكنك تعديل هذه القيمة إذا كانت الصورة غير واضحة
//         />
//     </div>

//     <p className="mt-6 text-white">اتجه حتى يشير السهم نحو القبلة</p>
//     </div>
// );
// }

