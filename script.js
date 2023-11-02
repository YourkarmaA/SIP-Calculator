document.getElementById('calculate-button').addEventListener('click', calculateSIP);

function calculateSIP() {
    const monthlyInvestment = parseFloat(document.getElementById('monthly-investment-value').textContent.replace('₹', ''));
    const investmentDuration = parseInt(document.getElementById('investment-duration-value').textContent);
    const annualInterestRate = parseFloat(document.getElementById('annual-interest-rate-value').textContent);

    const years = investmentDuration;
    const monthlyInterestRate = (annualInterestRate / 12) / 100;

    const n = years * 12;
    const M = calculateMaturityAmount(monthlyInvestment, n, monthlyInterestRate);
    const totalInvestedAmount = monthlyInvestment * n;
    const estimatedReturns = M - totalInvestedAmount;

    document.getElementById('total-invested-amount').textContent = `₹${totalInvestedAmount.toFixed(2)}`;
    document.getElementById('estimated-returns').textContent = `₹${estimatedReturns.toFixed(2)}`;
    document.getElementById('total-value').textContent = `₹${M.toFixed(2)}`;

    const chartData = [totalInvestedAmount, estimatedReturns];
    createChart(chartData);
    
    // Show the result section and chart
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('chart').classList.remove('hidden');
}

function calculateMaturityAmount(P, n, monthlyInterestRate) {
    return P * ((Math.pow(1 + monthlyInterestRate, n) - 1) / monthlyInterestRate) * (1 + monthlyInterestRate);
}

function createChart(data) {
    const chartCanvas = document.getElementById('chart');
    const ctx = chartCanvas.getContext('2d');

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Total Invested Amount', 'Estimated Returns'],
            datasets: [{
                data: data,
                backgroundColor: ['#007BFF', '#ff5722'],
            }],
        },
    });
}

// Add event listeners to update slider values as they are moved
updateSliderValue('monthly-investment', 'monthly-investment-value');
updateSliderValue('investment-duration', 'investment-duration-value');
updateSliderValue('annual-interest-rate', 'annual-interest-rate-value');

function updateSliderValue(sliderId, valueId) {
    const slider = document.getElementById(sliderId);
    const value = document.getElementById(valueId);
    value.textContent = (sliderId === 'monthly-investment') ? `₹${slider.value}` : `${slider.value} years`;
    slider.addEventListener('input', () => {
        value.textContent = (sliderId === 'monthly-investment') ? `₹${slider.value}` : `${slider.value} years`;
    });
}
