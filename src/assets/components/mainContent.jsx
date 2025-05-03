"use client";
import data from "./data.json";
import Stack from "@mui/material/Stack";
import "./mainContent.css";
import Prayer from "./prayer";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "moment/dist/locale/ar-ma";
moment.locale("ar-ma");
// import Kebla from './kebla';
export default function MainContent() {
    /*====================== ALL STATUS ====================  */
    // Location
    const [location, setLocation] = useState({
        lat: null,
        lon: null,
        address: "",
        city: "",
        country: "",
    });
    // Country
    const [country, setcountry] = useState({
        countryEn: "",
        countryAr: "",
    });
    // City
    const [city, setCity] = useState({
        nameAr: "",
        nameEn: "",
    });
    // Timer as GUI line
    const [theDiff_between_2prayer, setTheDiff_between_2prayer] = useState(0);
    const [
        theDiff_between_now_and_nextprayer,
        setTheDiff_between_now_and_nextprayer,
    ] = useState(0);
    const [timer_GUI, setTimer_GUI] = useState(0);
    // Avalibl cities in the choosen country
    const [avaliblcities, set_avaliblcities] = useState([
        { nameEn: 'Alexandria', nameAr: 'الإسكندرية' },
        { nameEn: 'Cairo', nameAr: "القاهرة" },
        { nameEn: 'Ismailia', nameAr: "الاسماعيلية" },
        { nameEn: 'Gizeh', nameAr: "الجيزة" },
        { nameEn: 'Aswan', nameAr: "أسوان" },
        { nameEn: 'Luxor', nameAr: "الأقصر" },
        { nameEn: 'Damanhur', nameAr: "دمنهور" },
        { nameEn: 'Shubra El-Kheima', nameAr: "شبرا الخيمة" },
        { nameEn: 'Port Said', nameAr: "بور سعيد" },
    ]);
    // Prayers times
    const [timings, setTimings] = useState({
        Fajr: "00:00",
        Sunrise: "00:00",
        Dhuhr: "00:00",
        Asr: "00:00",
        Maghrib: "00:00",
        Isha: "00:00",
    });
    // Time state -> not used
    // const [time, setTime] = useState(null)
    // Current date as meladi
    const [toDay, setToDay] = useState("");
    // Current date as hgry
    const [hgry, setHgry] = useState({});
    // Timer
    const [timer, setTimer] = useState("");
    // Next prayer
    const [nexPrayerIndex, setNextPrayerIndex] = useState(0);
    // Last prayer
    const [lastPrayerIndex, setLastPrayerIndex] = useState(0);
    /*====================== ALL PRAYERS ====================  */
    const allPryers = [
        { nameEn: "Fajr", nameAr: "الفجر" },
        { nameEn: "Sunrise", nameAr: "الشروق" },
        { nameEn: "Dhuhr", nameAr: "الظهر" },
        { nameEn: "Asr", nameAr: "العصر" },
        { nameEn: "Maghrib", nameAr: "المغرب" },
        { nameEn: "Isha", nameAr: "العشاء" },
    ];
    /*====================== GET LOCATION ====================  */
    const myData = data; // get data from json file AS array of objects
    const API_URL = `https://api.opencagedata.com/geocode/v1/json?`;
    const apiKey = "9a1b3d0f87a24eb486288bbceae2bb9d";
    // get long and lat
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation((prev) => ({ ...prev, lat: latitude, lon: longitude }));
                    fetchLocation(latitude, longitude);
                },
                (error) => console.error("Error getting location:", error)
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);
    // get location by long and lat
    const fetchLocation = async (lat, lon) => {
        try {
            const response = await axios.get(
                `${API_URL}q=${lat}+${lon}&key=${apiKey}`
            );
            const formattedAddress =
                response.data.results[0]?.formatted || "Location not found";
            const iso = response.data.results[0].components.country_code;
            const country = response.data.results[0].components.country;
            const cityName = response.data.results[0].components.city;
            setLocation((prev) => ({
                ...prev,
                address: formattedAddress,
                country: iso,
                city: cityName,
            }));
            // search for user's location in myData array
            const user_location_object = myData.find((c) => {
                return c.countryEn == iso;
            });
            // if location is't included in myData array put info in english
            if (user_location_object == undefined) {
                setcountry({ ...country, countryEn: iso, countryAr: country });
                setCity({ nameEn: cityName, nameAr: cityName });
            }
            // if location is included in myData array
            else {
                setcountry({
                    ...country,
                    countryEn: user_location_object.countryEn,
                    countryAr: user_location_object.countryAr,
                });
                set_avaliblcities(user_location_object.cities);
                const city_curentOpject = avaliblcities.find((city) => {
                    return city.nameEn == cityName;
                });
                if (city_curentOpject == undefined) {
                    setCity({ nameEn: cityName, nameAr: cityName });
                }
                // if city is included in cities array
                else {
                    setCity({
                        nameEn: city_curentOpject.nameEn,
                        nameAr: city_curentOpject.nameAr,
                    });
                }
            }
        } catch (error) {
            console.error("Error fetching location name:", error);
        }
    };
    // handel coutry function
    const handelcoutry = (e) => {
        const country_curentOpject = myData.find((c) => {
            return c.countryEn == e.target.value;
        });
        setcountry({
            ...country,
            countryEn: country_curentOpject.countryEn,
            countryAr: country_curentOpject.countryAr,
        });
        set_avaliblcities(country_curentOpject.cities);
        setCity({
            ...city,
            nameEn: country_curentOpject.capetal.nameEn,
            nameAr: country_curentOpject.capetal.nameAr,
        });
    };

    // api request to get timings by city and country
    const getTimings = async () => {
        const respons = await axios.get(
            `https://api.aladhan.com/v1/timingsByCity?country=${country.countryEn}&city=${city.nameEn}`
        );
        const data = respons.data.data;
        // update stat after api respons
        setTimings(data.timings);
        const dateInHgry = {
            day: data.date.hijri.day,
            month: data.date.hijri.month.ar,
            year: data.date.hijri.year,
        };
        setHgry(dateInHgry);
    };
    // api request by useEffect
    useEffect(() => {
        getTimings();
    }, [city]);

    // handle city function
    const handlCity = (e) => {
        const city_curentOpject = avaliblcities.find((city) => {
            return city.nameEn == e.target.value;
        });
        setCity(city_curentOpject);
    };
    // useing timer
    useEffect(() => {
        let x = setInterval(() => {
            setUpCountDownTimer();
        }, 1000);
        // refresh the time and day state
        const t = moment();
        setToDay(t.format("Do MMM YYYY"));
        // setTime(t.format('hh:mm'))
        return () => {
            clearInterval(x);
        };
    }, [timings]);
    const setUpCountDownTimer = () => {
        // time now
        const momentNow = moment();

        let nextPrayer = null;
        let lastPrayer = null;
        // cheack witch the next prayer is
        if (
            momentNow.isAfter(moment(timings.Fajr, "hh:mm")) &&
            momentNow.isBefore(moment(timings.Sunrise, "hh:mm"))
        ) {
            nextPrayer = 1;
            lastPrayer = 0;
        } else if (
            momentNow.isAfter(moment(timings.Sunrise, "hh:mm")) &&
            momentNow.isBefore(moment(timings.Dhuhr, "hh:mm"))
        ) {
            nextPrayer = 2;
            lastPrayer = 1;
        } else if (
            momentNow.isAfter(moment(timings.Dhuhr, "hh:mm")) &&
            momentNow.isBefore(moment(timings.Asr, "hh:mm"))
        ) {
            nextPrayer = 3;
            lastPrayer = 2;
        } else if (
            momentNow.isAfter(moment(timings.Asr, "hh:mm")) &&
            momentNow.isBefore(moment(timings.Maghrib, "hh:mm"))
        ) {
            nextPrayer = 4;
            lastPrayer = 3;
        } else if (
            momentNow.isAfter(moment(timings.Maghrib, "hh:mm")) &&
            momentNow.isBefore(moment(timings.Isha, "hh:mm"))
        ) {
            nextPrayer = 5;
            lastPrayer = 4;
        } else {
            nextPrayer = 0;
            lastPrayer = 5;
        }
        setNextPrayerIndex(nextPrayer);
        setLastPrayerIndex(lastPrayer);
        // timer part with next pryer
        // know what the next prayer is
        const nextObject = allPryers[nextPrayer];
        const nextPrayerTime = timings[nextObject.nameEn];
        const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");
        // الوقت المتبقي بين الوقت الحالي والصلاة القادمة
        let remainingtTime = nextPrayerTimeMoment.diff(momentNow);
        if (remainingtTime < 0) {
            const midnigthDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
            const faher_midnigthDiff = nextPrayerTimeMoment.diff(
                moment("00:00:00", "hh:mm:ss")
            );
            const totalDiff = midnigthDiff + faher_midnigthDiff;
            remainingtTime = totalDiff;
        }
        // but the diff between now and next prayer as seconds in state to use it in GUI
        setTheDiff_between_now_and_nextprayer(remainingtTime);
        // صيغة مفهومة
        const duration_remainingtTime = moment.duration(remainingtTime);
        setTimer(
            `${duration_remainingtTime.seconds()} : ${duration_remainingtTime.minutes()} : ${duration_remainingtTime.hours()}`
        );
        // know what the last prayer is
        const lastObject = allPryers[lastPrayer];
        const lastPrayerTime = timings[lastObject.nameEn];
        const lastPrayerTimeMoment = moment(lastPrayerTime, "hh:mm");
        // الوقت المتبقي بين الصلاة السابقة والصلاة القادمة
        let diff_time = nextPrayerTimeMoment.diff(lastPrayerTimeMoment);
        if (diff_time < 0) {
            const midnigthDiff = moment("23:59:59", "hh:mm:ss").diff(
                lastPrayerTimeMoment
            );
            const faher_midnigthDiff = nextPrayerTimeMoment.diff(
                moment("00:00:00", "hh:mm:ss")
            );
            const totalDiff = midnigthDiff + faher_midnigthDiff;
            diff_time = totalDiff;
        }
        // but the diff between last prayer and next prayer as seconds in state to use it in GUI
        setTheDiff_between_2prayer(diff_time);
    };
    useEffect(() => {
        setTimer_GUI(
            (theDiff_between_now_and_nextprayer / theDiff_between_2prayer) * 100
        );
    }, [theDiff_between_now_and_nextprayer, theDiff_between_2prayer]);
    // ______________________________________________________Main Return_________________________________________________
    return (
        <div>
            {/* <Kebla /> */}
            <div className="mainContent_container">
                {/*====================== HEADER ====================  */}
                <section
                    onClick={() => {
                        document
                            .querySelector(".selecters")
                            .classList.remove("selecter_active");
                    }}
                    className="header"
                >
                    {/*div->> date and location */}
                    <div className="header_rigth">
                        <div className="date">
                            <p>{toDay}</p> {/*date meladi */}
                            {/* <p>{time}</p> */}
                            <p>{`${hgry.day} ${hgry.month} ${hgry.year}`}</p>
                        </div>
                        {location.lat && location.lon ? (
                            <h1>
                                {country.countryAr} | {city.nameAr}
                            </h1>
                        ) : (
                            <h1>جارٍ تحديد موقعك...</h1>
                        )}
                    </div>
                    {/*div->> next prayer and timer */}
                    <div className="header_left">
                        <h2>متبقي على {allPryers[nexPrayerIndex].nameAr}</h2>
                        <h1>{timer}</h1>
                        <div className="timer_GUI">
                            <div
                                style={{
                                    backgroundColor: "#fff",
                                    width: `${timer_GUI}%`,
                                    height: "100%",
                                    borderRadius: "10rem",
                                    transition: "0.5s",
                                }}
                            ></div>
                        </div>
                    </div>
                </section>
                {/*====================== PRAYER CARDS ====================  */}
                <Stack
                    onClick={() => {
                        document
                            .querySelector(".selecters")
                            .classList.remove("selecter_active");
                    }}
                    className="cards"
                >
                    <Prayer time={timings.Fajr} name="الفجر" imge="./imgs/fgr.jpg" />
                    <Prayer
                        time={timings.Sunrise}
                        name="الشروق"
                        imge="./imgs/Sunrise.jpg"
                    />
                    <Prayer time={timings.Dhuhr} name="الظهر" imge="./imgs/duhr.jpg" />
                    <Prayer time={timings.Asr} name="العصر" imge="./imgs/asr.jpg" />
                    <Prayer time={timings.Maghrib} name="المغرب" imge="./imgs/mgrb.jpg" />
                    <Prayer time={timings.Isha} name="العشاء" imge="./imgs/isha.jpg" />
                </Stack>
                {/*====================== SELECTOR ====================  */}
                <div className="selecters">
                    {/* choose your country*/}
                    <div>
                        <label className="select" htmlFor="country">
                            <select id="country" required onChange={handelcoutry}>
                                <option disabled selected value={country.countryEn}>
                                    البلد
                                </option>
                                {
                                    // create <option> to every country in array (myData)
                                    myData.map((c, index) => {
                                        return (
                                            <option key={index} value={c.countryEn}>
                                                {c.countryAr}
                                            </option>
                                        );
                                    })
                                }
                            </select>
                            <svg>
                                <use xlinkHref="#select-arrow-down" />
                            </svg>
                        </label>
                        <svg className="sprites">
                            <symbol id="select-arrow-down" viewBox="0 0 10 6">
                                <polyline points="1 1 5 5 9 1" />
                            </symbol>
                        </svg>
                    </div>
                    {/* choose your city*/}
                    <div>
                        <label className="select" htmlFor="city">
                            <select id="city" required onChange={handlCity}>
                                <option disabled selected value={city.nameEn}>
                                    المدينة
                                </option>
                                {
                                    // create <option> to every city in all cities array (avaliblcities)
                                    avaliblcities.map((city, index) => {
                                        return (
                                            <option key={index} value={city.nameEn}>
                                                {city.nameAr}
                                            </option>
                                        );
                                    })
                                }
                            </select>
                            <svg>
                                <use xlinkHref="#select-arrow-down" />
                            </svg>
                        </label>
                        <svg className="sprites">
                            <symbol id="select-arrow-down" viewBox="0 0 10 6">
                                <polyline points="1 1 5 5 9 1" />
                            </symbol>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
