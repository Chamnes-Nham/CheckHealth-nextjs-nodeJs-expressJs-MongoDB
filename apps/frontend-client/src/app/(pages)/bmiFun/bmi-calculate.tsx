

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/components/molecules/input-field";
import SelectField from "@/components/molecules/select-field";
import Button from "@/components/atoms/button";

type bmiType = {
  weight: number;
  height: number;
  age: number;
};

const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState<number | "">(65);
  const [height, setHeight] = useState<number | "">(170);
  const [age, setAge] = useState<number | "">(21);
  const [gender, setGender] = useState<string>("male");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const router = useRouter();

  const calculateBMI = async () => {
    if (weight && height && age && gender) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(bmiValue);

      const bmiCategory = getBMICategory(bmiValue, age, gender);
      setCategory(bmiCategory);
// fix error git
      try {
        const response = await fetch("http://localhost:3001/v1/bmi/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            weight,
            height,
            age,
            gender,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error:", response.status, errorData);
          alert(
            `Error ${response.status}: ${errorData.message || "Request failed"}`
          );
          return;
        }

        const responseData = await response.json();

        router.push(
          `/bmiFun/results?bmi=${bmiValue.toFixed(2)}&category=${encodeURIComponent(bmiCategory)}&weight=${weight}&height=${height}&showModal=true`
        );
      } catch (error) {
        console.error("Network Error:", error);
        alert("Network Error: Could not connect to the backend service.");
      }
    }
  };
  const clearFields = () => {
    setWeight("");
    setHeight("");
    setAge("");
    setGender("");
    setBmi(null);
    setCategory("");
  };

  const getBMICategory = (bmi: number, age: number, gender: string): string => {
    if (age < 18) {
      if (bmi < 5) return "ស្គមខ្លាំងណាស់";
      if (bmi >= 5 && bmi < 10) return "ស្គមខ្លាំង";
      if (bmi >= 10 && bmi < 18.5) return "ស្គម";
      if (bmi >= 18.5 && bmi < 25) return "សុខភាពល្អ";
      if (bmi >= 25 && bmi < 30) return "លើសទម្ងន់";
      if (bmi >= 30 && bmi < 35) return "លើសទម្ងន់ខ្លាំង";
      if (bmi >= 35 && bmi < 40) return "លើសទម្ងន់ខ្លាំងណាស់";
      return "ធាត់ខ្លាំងណាស់";
    } else {
      if (gender === "male") {
        if (bmi < 15) return "ស្គមខ្លាំងណាស់";
        if (bmi >= 15 && bmi < 16) {
          return "ស្គមខ្លាំង";
        }
        if (bmi >= 16 && bmi < 18.5) {
          return "ស្គម";
        }
        if (bmi >= 18.5 && bmi < 25) {
          return "សុខភាពល្អ";
        }
        if (bmi >= 25 && bmi < 30) return "លើសទម្ងន់";
        if (bmi >= 30 && bmi < 35) return "លើសទម្ងន់ខ្លាំង";
        if (bmi >= 35 && bmi < 40) return "លើសទម្ងន់ខ្លាំងណាស់";
        return "ធាត់ខ្លាំងណាស់";
      } else {
        if (bmi < 14.5) return "ស្គមខ្លាំងណាស់";
        if (bmi >= 14.5 && bmi < 15.5) return "ស្គមខ្លាំង";
        if (bmi >= 15.5 && bmi < 18) return "ស្គម";
        if (bmi >= 18 && bmi < 24.5) return "សុខភាពល្អ";
        if (bmi >= 24.5 && bmi < 29.5) return "លើសទម្ងន់";
        if (bmi >= 29.5 && bmi < 34.5) return "លើសទម្ងន់ខ្លាំង";
        if (bmi >= 34.5 && bmi < 39.5) return "លើសទម្ងន់ខ្លាំងណាស់";
        return "ធាត់ខ្លាំងណាស់";
      }
    }
  };

  return (
    <div className="mt-20 mx-[20px]">
      <h1 className="text-[24px] text-bold mb-5">គណនា BMI របស់អ្នក</h1>{" "}
      <InputField
        label="ទម្ងន់(kg)"
        type="number"
        value={weight}
        onChange={(e) =>
          setWeight(e.target.value ? parseFloat(e.target.value) : "")
        }
      />
      <InputField
        label="កម្ពស់(cm)"
        type="number"
        value={height}
        onChange={(e) =>
          setHeight(e.target.value ? parseFloat(e.target.value) : "")
        }
      />
      <InputField
        label="អាយុ"
        type="number"
        value={age}
        onChange={(e) =>
          setAge(e.target.value ? parseFloat(e.target.value) : "")
        }
      />
      <SelectField
        label="ភេទ"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        options={[
          { value: "", label: "" },
          { value: "male", label: "ប្រុស" },
          { value: "female", label: "ស្រី" },
        ]}
      />
      <div>
        <Button
          label="ពិនិត្យ"
          size="medium"
          width="100%"
          height="47px"
          textColor="white"
          backgroundColor="#3385FF"
          onClick={calculateBMI}
        />
        <Button
          label="សម្អាត"
          size="medium"
          width="100%"
          height="47px"
          textColor="black"
          backgroundColor="#FFFFFF"
          onClick={clearFields}
        />
      </div>
    </div>
  );
};

export default BMICalculator;