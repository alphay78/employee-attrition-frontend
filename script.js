async function predict(model) {
  const payload = {
    Age: +Age.value,
    MonthlyIncome: +MonthlyIncome.value,
    JobLevel: +JobLevel.value,
    JobSatisfaction: +JobSatisfaction.value,
    YearsAtCompany: +YearsAtCompany.value,
    OverTime: OverTime.value,
    Department: Department.value,
    EducationField: EducationField.value,
  };

  const endpoint = `http://127.0.0.1:8000/predict/${model}`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    const risk = data.attrition_prediction === 1 ? "HIGH" : "LOW";
    const prob = (data.probability * 100).toFixed(2);

    result.innerHTML = `
      <h2>Prediction Result</h2>
      <p><strong>Model:</strong> ${data.model_used}</p>
      <p><strong>Attrition Risk:</strong> ${risk}</p>
      <p><strong>Probability:</strong> ${prob}%</p>
    `;

    result.classList.remove("hidden");
  } catch (err) {
    alert("Prediction failed. Check backend.");
  }
}
