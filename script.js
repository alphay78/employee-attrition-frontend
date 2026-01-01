// ✅ Render backend base URL (NO trailing slash)
const API_BASE_URL = "https://employee-attrition-backend-2.onrender.com";

const Age = document.getElementById("Age");
const MonthlyIncome = document.getElementById("MonthlyIncome");
const JobLevel = document.getElementById("JobLevel");
const JobSatisfaction = document.getElementById("JobSatisfaction");
const YearsAtCompany = document.getElementById("YearsAtCompany");
const OverTime = document.getElementById("OverTime");
const Department = document.getElementById("Department");
const EducationField = document.getElementById("EducationField");
const result = document.getElementById("result");

async function predict(model) {
  // ✅ MUST MATCH FastAPI schema EXACTLY
  const payload = {
    Age: Number(Age.value),
    MonthlyIncome: Number(MonthlyIncome.value),
    JobLevel: Number(JobLevel.value),
    JobSatisfaction: Number(JobSatisfaction.value),
    YearsAtCompany: Number(YearsAtCompany.value),
    OverTime: OverTime.value,
    Department: Department.value,
    EducationField: EducationField.value,
  };

  const endpoint = `${API_BASE_URL}/predict/${model}`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText);
    }

    const data = await res.json();

    const risk = data.attrition_prediction === 1 ? "HIGH" : "LOW";
    const probability = (data.probability * 100).toFixed(2);

    result.innerHTML = `
      <h2>Prediction Result</h2>
      <p><strong>Model:</strong> ${data.model_used}</p>
      <p><strong>Attrition Risk:</strong> ${risk}</p>
      <p><strong>Probability:</strong> ${probability}%</p>
    `;

    result.classList.remove("hidden");
  } catch (error) {
    console.error(error);
    alert("Prediction failed. Please check backend connection.");
  }
}
