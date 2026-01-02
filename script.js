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
  const payload = {
    age: Number(Age.value),
    monthly_income: Number(MonthlyIncome.value),
    job_level: Number(JobLevel.value),
    job_satisfaction: Number(JobSatisfaction.value),
    years_at_company: Number(YearsAtCompany.value),
    overtime: OverTime.value,
    department: Department.value,
    education_field: EducationField.value,
  };

  const endpoint = `${API_BASE_URL}/predict/${model}`;

  try {
    result.classList.remove("hidden");
    result.innerHTML = "<p>⏳ Predicting...</p>";

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
    const probability = (data.confidence * 100).toFixed(2);

    result.innerHTML = `
      <h3>Prediction Result</h3>
      <p><strong>Model:</strong> ${data.model_used}</p>
      <p><strong>Attrition Risk:</strong> ${risk}</p>
      <p><strong>Probability:</strong> ${probability}%</p>
    `;
  } catch (error) {
    console.error("Prediction error:", error);
    result.innerHTML = `
      <p style="color:red;">
        ❌ Prediction failed.<br/>
        ${error.message}
      </p>
    `;
  }
}
