import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Modal, Platform, Text, TouchableOpacity, View } from "react-native";

type CalendarData = {
    departure: string;
    arrival: string;
    onboarding: string;
    familyArrival: string;
};

export function UpdateCalendarDetail({
    data,
    onSave,
}: {
    data: CalendarData;
    onSave: (updatedData: CalendarData) => void;
}) {
    const [dates, setDates] = useState([
        {
            id: "departure",
            label: "Departure date",
            value: data.departure,
            iconColor: "text-teal-500 bg-teal-50",
            icon: "airplane",
        },
        {
            id: "arrival",
            label: "Arrive at destination",
            value: data.arrival,
            iconColor: "text-purple-500 bg-purple-50",
            icon: "home",
        },
        {
            id: "onboarding",
            label: "Onboarding day",
            value: data.onboarding,
            iconColor: "text-yellow-600 bg-yellow-50",
            icon: "briefcase",
        },
        {
            id: "familyArrival",
            label: "Family arrival",
            value: data.familyArrival,
            iconColor: "text-red-500 bg-red-50",
            icon: "people",
        },
    ]);

    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [selectedDateIndex, setSelectedDateIndex] = useState<number | null>(
        null,
    );
    const [tempSelectedDate, setTempSelectedDate] = useState(new Date());

    const handleOpenPicker = (index: number) => {
        setSelectedDateIndex(index);
        setTempSelectedDate(getPickerDateValue(index));
        setDatePickerVisible(true);
    };

    const getPickerDateValue = (index: number | null = selectedDateIndex) => {
        if (index === null) {
            return new Date();
        }

        const selectedValue = dates[index]?.value;
        if (!selectedValue) {
            return new Date();
        }

        const [day, month, year] = selectedValue.split("/");
        const parsedDate = new Date(
            Number(year),
            Number(month) - 1,
            Number(day),
        );
        return Number.isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
    };

    const saveSelectedDate = (selectedDate: Date) => {
        if (selectedDateIndex === null) {
            return;
        }

        const newDates = [...dates];
        const day = selectedDate.getDate().toString().padStart(2, "0");
        const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
        const year = selectedDate.getFullYear();

        newDates[selectedDateIndex] = {
            ...newDates[selectedDateIndex],
            value: `${day}/${month}/${year}`,
        };
        setDates(newDates);
    };

    const handleDateChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS === "android") {
            setDatePickerVisible(false);
            if (event.type === "set" && selectedDate) {
                saveSelectedDate(selectedDate);
            }
            return;
        }

        if (selectedDate) {
            setTempSelectedDate(selectedDate);
        }
    };

    const handleCancelPicker = () => {
        setDatePickerVisible(false);
    };

    const handleConfirmPicker = () => {
        saveSelectedDate(tempSelectedDate);
        setDatePickerVisible(false);
    };

    const handleSaveDates = () => {
        const getDateValue = (id: string, fallback: string) =>
            dates.find((item) => item.id === id)?.value ?? fallback;

        onSave({
            departure: getDateValue("departure", data.departure),
            arrival: getDateValue("arrival", data.arrival),
            onboarding: getDateValue("onboarding", data.onboarding),
            familyArrival: getDateValue("familyArrival", data.familyArrival),
        });
    };

    return (
        <View className="gap-3">
            <Text className="text-teal-600 text-xs font-bold uppercase tracking-wider mb-[-8px]">
                June 2025
            </Text>
            <Text className="text-black text-xl font-bold mb-1">
                Update calendar
            </Text>
            <Text className="text-gray-400 text-xs mb-4">
                Pick the dates that work best — you can edit later.
            </Text>

            {dates.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => handleOpenPicker(index)}
                    className="bg-white px-4 py-3 rounded-2xl shadow-sm border border-gray-100 flex-row items-center justify-between mb-2"
                >
                    <View className="flex-row items-center">
                        <View
                            className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${item.iconColor}`}
                        >
                            <Ionicons name={item.icon as any} size={20} />
                        </View>
                        <View>
                            <Text className="text-black text-sm font-bold">
                                {item.label}
                            </Text>
                            <Text className="text-gray-500 text-xs">
                                {item.value}
                            </Text>
                        </View>
                    </View>
                    <Ionicons
                        name="calendar-outline"
                        size={20}
                        color="#9CA3AF"
                    />
                </TouchableOpacity>
            ))}

            {Platform.OS === "android" && datePickerVisible && (
                <DateTimePicker
                    value={getPickerDateValue()}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}

            {Platform.OS === "ios" && (
                <Modal
                    visible={datePickerVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={handleCancelPicker}
                >
                    <View className="flex-1 bg-black/30 justify-center px-6">
                        <View className="bg-white rounded-2xl p-4">
                            <DateTimePicker
                                value={tempSelectedDate}
                                mode="date"
                                display="inline"
                                onChange={handleDateChange}
                            />
                            <View className="flex-row justify-end gap-3 mt-3">
                                <TouchableOpacity onPress={handleCancelPicker}>
                                    <Text className="text-gray-500 font-semibold">
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleConfirmPicker}>
                                    <Text className="text-cyan-600 font-semibold">
                                        Done
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}

            <TouchableOpacity
                onPress={handleSaveDates}
                className=" bg-[#0891B2] text-white justify-center text-base flex-row items-center px-4 py-4 rounded-full"
            >
                <Text className="text-white text-base font-bold">
                    Save Dates
                </Text>
            </TouchableOpacity>
        </View>
    );
}
