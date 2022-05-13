/**
 * litsen for submit
 */

document.getElementById("loan-form").addEventListener("submit", function (e) {
  //hide results
  document.getElementById("results").style.display = "none";

  //show loader
  document.getElementById("loading").style.display = "block";

  //setting timeout for loader
  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

/**
 * calculate results
 */
function calculateResults() {
  // UI variables
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  //principal
  const principal = parseFloat(amount.value);

  //calaculated Interest
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;

  //calculated payments
  const calculatedPayments = parseFloat(years.value) * 12;

  //monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    //setting the monthly payment
    monthlyPayment.value = monthly.toFixed(2);

    //setting the total payment
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);

    //setting the total interest
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    //show result
    document.getElementById("results").style.display = "block";

    //hide loader
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please Check Your Numbers");
  }
}

/**
 * Show error
 */

function showError(error) {
  // Create a div
  const errorDiv = document.createElement("div");

  // Get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add class
  errorDiv.className = "alert alert-danger";

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
  //hide loader
  document.getElementById("loading").style.display = "none";
  //hide results
  document.getElementById("results").style.display = "none";
}

/**
 * Remove Error Alert
 */
function clearError() {
  document.querySelector(".alert").remove();
}
