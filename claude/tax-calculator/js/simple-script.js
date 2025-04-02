/**
 * 税負担シミュレーター メインスクリプト（単純化版）
 */

// グローバル変数
let currentIncome = 5000000; // 初期値500万円
let taxResults = []; // 税金計算結果の配列

// 所得税率表
const taxRates = [
    { min: 0, max: 1950000, rate: 0.05, deduction: 0 },
    { min: 1950000, max: 3300000, rate: 0.1, deduction: 97500 },
    { min: 3300000, max: 6950000, rate: 0.2, deduction: 427500 },
    { min: 6950000, max: 9000000, rate: 0.23, deduction: 636000 },
    { min: 9000000, max: 18000000, rate: 0.33, deduction: 1536000 },
    { min: 18000000, max: 40000000, rate: 0.4, deduction: 2796000 },
    { min: 40000000, max: Infinity, rate: 0.45, deduction: 4796000 }
];

// 所得レベルの配列
const incomeAmounts = [
    // 100万円～1000万円（100万円単位）
    1000000, 2000000, 3000000, 4000000, 5000000, 6000000, 7000000, 8000000, 9000000, 10000000,
    // 1000万円～2000万円（200万円単位）
    12000000, 14000000, 16000000, 18000000, 20000000,
    // 2000万円～6000万円（500万円単位）
    25000000, 30000000, 35000000, 40000000, 45000000, 50000000, 55000000, 60000000
];

// 控除の初期値
let deductions = {
    basicDeduction: 480000,   // 基礎控除
    blueDeduction: 650000,    // 青色申告控除
    healthInsurance: 297600,  // 健康保険料
    pension: 210120,          // 国民年金保険料（令和7年度、月額17,510円）
    smallBusiness: 840000,    // 小規模企業共済
    familySalary: 0           // 専従者給与
};

// 健康保険料計算関数
function calculateHealthInsurance(type, age, income) {
    // 控除後所得額（課税対象額）
    const taxableIncome = Math.max(0, income - deductions.basicDeduction - deductions.blueDeduction - deductions.smallBusiness);
    
    switch(type) {
        case 'kokuho': // 国民健康保険（江東区 令和7年）
            if (age === 'under40') {
                // 40歳未満
                const fixed = 64100; // 均等割部分
                const variable = taxableIncome * 0.104; // 所得割部分
                return Math.min(fixed + variable, 920000); // 上限920,000円
            } else if (age === '40to64') {
                // 40〜64歳
                const fixed = 80700; // 均等割部分
                const variable = taxableIncome * 0.1265; // 所得割部分
                return Math.min(fixed + variable, 1090000); // 上限1,090,000円
            } else {
                // 65歳以上は後期高齢者医療となるため適応外
                return 70000; // 概算値
            }

        case 'bunbi': // 文芸美術国民健康保険（令和7年）
            return 308400; // 単身の場合の年間保険料（月額25,700円）

        case 'kyokai': // 協会けんぽ（東京都）
            // 標準報酬月額を推定（単純化のため税引前所得の1/12と仮定）
            const monthlyIncome = income / 12;
            // 東京都の協会けんぽ保険料率は9.98%
            let rate = 0.0998;
            // 40〜64歳は介護保険料的1.59%が加算
            if (age === '40to64') {
                rate += 0.0159;
            }
            return Math.floor(monthlyIncome * rate * 12); // 年間保険料

        default:
            return 297600; // デフォルト値
    }
}

// ツールチップの内容を更新する関数
function updateHealthInsuranceTooltip() {
    const selectedType = document.getElementById('health-insurance-type').value;
    const selectedAge = document.getElementById('age-select').value;
    const tooltipElement = document.getElementById('health-insurance').nextElementSibling.querySelector('.tooltip-text');
    
    let tooltipText = '';
    
    switch(selectedType) {
        case 'kokuho':
            if (selectedAge === 'under40') {
                tooltipText = '国民健康保険（江東区令和7年度）、40歳未満の場合。均等割額64,100円＋所得割額（所得×10.4%）。上限額92万円';
            } else if (selectedAge === '40to64') {
                tooltipText = '国民健康保険（江東区令和7年度）、40〜64歳の場合。均等割額80,700円＋所得割額（所得×12.65%）。上限額109万円';
            } else {
                tooltipText = '国民健康保険（江東区令和7年度）、65歳以上の場合。後期高齢者医療制度が適用されます。概算値として7万円';
            }
            break;
        case 'bunbi':
            tooltipText = '文芸美術国民健康保険（令和7年度）。単身の場合の年間保険料は308,400円（月額25,700円）';
            break;
        case 'kyokai':
            if (selectedAge === '40to64') {
                tooltipText = '協会けんぽ（東京都令和7年度）、40〜64歳の場合。保険料率は月度報酬の11.57%（健康保険料願9.98%＋介護保険料願1.59%）';
            } else {
                tooltipText = '協会けんぽ（東京都令和7年度）。保険料率は月度報酬の9.98%';
            }
            break;
        default:
            tooltipText = '選択した健康保険の年間保険料（控除対象）';
    }
    
    tooltipElement.textContent = tooltipText;
}

// 控除額を入力フォームから取得する関数
function updateDeductions() {
    deductions.basicDeduction = parseFloat(document.getElementById('basic-deduction').value) || 0;
    deductions.blueDeduction = parseFloat(document.getElementById('blue-deduction').value) || 0;
    deductions.healthInsurance = parseFloat(document.getElementById('health-insurance').value) || 0;
    deductions.pension = parseFloat(document.getElementById('pension').value) || 0;
    deductions.smallBusiness = parseFloat(document.getElementById('small-business').value) || 0;
    deductions.familySalary = parseFloat(document.getElementById('family-salary').value) || 0;
}

// 控除額を初期値にリセットする関数
function resetDeductions() {
    deductions = {
        basicDeduction: 480000,
        blueDeduction: 650000,
        healthInsurance: 297600,
        pension: 210120,
        smallBusiness: 840000,
        familySalary: 0
    };
    
    currentIncome = 5000000; // 現在の所得もリセット
    
    // 入力フィールドを更新
    document.getElementById('current-income').value = currentIncome;
    document.getElementById('basic-deduction').value = deductions.basicDeduction;
    document.getElementById('blue-deduction').value = deductions.blueDeduction;
    document.getElementById('age-select').value = 'under40';
    document.getElementById('health-insurance-type').value = 'kokuho';
    document.getElementById('health-insurance').value = deductions.healthInsurance;
    document.getElementById('pension').value = deductions.pension;
    document.getElementById('small-business').value = deductions.smallBusiness;
    document.getElementById('family-salary').value = deductions.familySalary;
    
    // ツールチップの内容も更新
    updateHealthInsuranceTooltip();
}

// 所得に応じた所得税を計算する関数
function calculateIncomeTax(income) {
    // 適用される税率区分を見つける
    const taxRate = taxRates.find(rate => income >= rate.min && income < rate.max);
    
    // 所得税を計算（税率×課税所得 - 控除額）
    return Math.floor(income * taxRate.rate - taxRate.deduction);
}

// すべての所得区分に対して税金を計算する関数
function calculateTaxes() {
    taxResults = [];
    
    // 年齢と保険の種類を取得
    const selectedAge = document.getElementById('age-select').value;
    const selectedInsuranceType = document.getElementById('health-insurance-type').value;
    
    // 控除額合計（健康保険料と年金保険料を除く）
    const totalDeduction = deductions.basicDeduction + deductions.blueDeduction + deductions.smallBusiness;
    
    // すべての所得レベルに対して税金を計算
    incomeAmounts.forEach(income => {
        // 健康保険料を計算
        const healthInsuranceAmount = calculateHealthInsurance(selectedInsuranceType, selectedAge, income);
        
        // 控除後所得の計算（健康保険料と年金は控除から除外）
        const incomeAfterDeduction = Math.max(0, income - totalDeduction);
        
        // 所得税の計算
        const incomeTax = calculateIncomeTax(incomeAfterDeduction);
        
        // 住民税の計算（控除後所得の10%）
        const residenceTax = Math.floor(incomeAfterDeduction * 0.1);
        
        // 消費税（所得の10%と仮定）
        const consumptionTax = Math.floor(income * 0.1);
        
        // 税金合計（保険料も含む）
        const totalTax = incomeTax + residenceTax + consumptionTax + healthInsuranceAmount + deductions.pension;
        
        // 手取り額
        const takeHome = income - totalTax;
        
        // 実質税負担率
        const taxRate = (totalTax / income * 100).toFixed(2);
        
        // 結果を配列に追加
        taxResults.push({
            income: income,
            incomeAfterDeduction: incomeAfterDeduction,
            incomeTax: incomeTax,
            residenceTax: residenceTax,
            healthInsurance: healthInsuranceAmount,
            pension: deductions.pension,
            consumptionTax: consumptionTax,
            totalTax: totalTax,
            takeHome: takeHome,
            taxRate: taxRate
        });
    });
    
    // 現在の所得のデータが配列に存在しない場合は追加
    if (!taxResults.some(r => r.income === currentIncome) && currentIncome > 0) {
        // 健康保険料を計算
        const healthInsuranceAmount = calculateHealthInsurance(selectedInsuranceType, selectedAge, currentIncome);
        
        // 控除後所得の計算
        const incomeAfterDeduction = Math.max(0, currentIncome - totalDeduction);
        
        // 所得税の計算
        const incomeTax = calculateIncomeTax(incomeAfterDeduction);
        
        // 住民税の計算（控除後所得の10%）
        const residenceTax = Math.floor(incomeAfterDeduction * 0.1);
        
        // 消費税（所得の10%と仮定）
        const consumptionTax = Math.floor(currentIncome * 0.1);
        
        // 税金合計（保険料も含む）
        const totalTax = incomeTax + residenceTax + consumptionTax + healthInsuranceAmount + deductions.pension;
        
        // 手取り額
        const takeHome = currentIncome - totalTax;
        
        // 実質税負担率
        const taxRate = (totalTax / currentIncome * 100).toFixed(2);
        
        // 結果を配列に追加
        taxResults.push({
            income: currentIncome,
            incomeAfterDeduction: incomeAfterDeduction,
            incomeTax: incomeTax,
            residenceTax: residenceTax,
            healthInsurance: healthInsuranceAmount,
            pension: deductions.pension,
            consumptionTax: consumptionTax,
            totalTax: totalTax,
            takeHome: takeHome,
            taxRate: taxRate
        });
        
        // 所得順にソート
        taxResults.sort((a, b) => a.income - b.income);
    }
}

// 表を更新する関数
function updateTable() {
    const tableBody = document.querySelector('#tax-table tbody');
    tableBody.innerHTML = '';
    
    // 表示すべき重要な所得ポイント
    const displayIncomes = [1000000, 2000000, 3000000, 4000000, 5000000, 6000000, 7000000, 8000000, 9000000, 10000000, 
                           12000000, 14000000, 16000000, 18000000, 20000000, 25000000, 30000000, 40000000, 50000000, 60000000];
    
    // 現在の所得も表示対象に追加
    if (currentIncome > 0 && !displayIncomes.includes(currentIncome)) {
        displayIncomes.push(currentIncome);
        displayIncomes.sort((a, b) => a - b);
    }
    
    // 表に行を追加
    taxResults.filter(result => displayIncomes.includes(result.income)).forEach(result => {
        const row = document.createElement('tr');
        
        // 金額をフォーマットする関数
        const formatMoney = (amount) => '¥' + amount.toLocaleString();
        
        // 現在の所得の行を強調表示
        if (result.income === currentIncome) {
            row.style.backgroundColor = 'rgba(255, 158, 61, 0.2)';
            row.style.fontWeight = 'bold';
        }
        
        // 各セルを作成
        row.innerHTML = `
            <td>${formatMoney(result.income)}</td>
            <td>${formatMoney(result.incomeAfterDeduction)}</td>
            <td>${formatMoney(result.incomeTax)}</td>
            <td>${formatMoney(result.residenceTax)}</td>
            <td>${formatMoney(result.healthInsurance)}</td>
            <td>${formatMoney(result.pension)}</td>
            <td>${formatMoney(result.consumptionTax)}</td>
            <td>${formatMoney(result.totalTax)}</td>
            <td>${formatMoney(result.takeHome)}</td>
            <td>${result.taxRate}%</td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // 表の列幅を調整
    adjustColumnWidths();
}

// 税負担率グラフを描画する関数
function drawTaxRateChart() {
    // 単純化したモジュールの関数を呼び出す
    window.TaxSimpleChart.drawTaxRateChart(taxResults, currentIncome);
}

// 円グラフを更新する関数
function updateBreakdown() {
    // 所得選択欄から選択された所得を取得
    const selectedIncomeElement = document.getElementById('income-select');
    if (!selectedIncomeElement) return;
    
    const selectedIncome = parseInt(selectedIncomeElement.value);
    
    // 選択された所得に基づく結果を取得
    const result = taxResults.find(res => res.income === selectedIncome);
    if (!result) return;
    
    // 単純化したモジュールの関数を呼び出す
    window.TaxSimpleChart.updateBreakdownDetails(result);
    window.TaxSimpleChart.drawTaxBreakdownPie(result);
}

// 所得選択プルダウンを更新する関数
function updateIncomeSelectOptions() {
    const selectedIncomeElement = document.getElementById('income-select');
    
    // 現在の所得に近い値を選択
    if (currentIncome > 0) {
        // 所得選択欄にない場合は追加
        if (!Array.from(selectedIncomeElement.options).some(opt => parseInt(opt.value) === currentIncome)) {
            // 追加する位置を見つける
            const options = Array.from(selectedIncomeElement.options);
            let insertIndex = 0;
            for (let i = 0; i < options.length; i++) {
                if (parseInt(options[i].value) > currentIncome) {
                    insertIndex = i;
                    break;
                }
                insertIndex = i + 1;
            }
            
            // 新しいオプションを作成
            const newOption = document.createElement('option');
            newOption.value = currentIncome;
            newOption.text = `${(currentIncome / 10000).toFixed(0)}万円`;
            
            // 適切な位置に挿入
            if (insertIndex >= options.length) {
                selectedIncomeElement.appendChild(newOption);
            } else {
                selectedIncomeElement.insertBefore(newOption, options[insertIndex]);
            }
        }
        
        // 現在の所得を選択
        selectedIncomeElement.value = currentIncome;
    }
}

// ヘッダーとボディの列幅を揃える関数
function adjustColumnWidths() {
    const headerTable = document.getElementById('tax-table-header');
    const bodyTable = document.getElementById('tax-table');
    
    if (!headerTable || !bodyTable) return;
    
    // ヘッダーテーブルから列幅を取得
    const headerCells = headerTable.querySelector('tr').children;
    const bodyCells = bodyTable.querySelector('tr') ? bodyTable.querySelector('tr').children : null;
    
    if (headerCells && bodyCells) {
        // 各列の幅を設定
        for (let i = 0; i < headerCells.length; i++) {
            if (i < bodyCells.length) {
                bodyCells[i].style.width = headerCells[i].offsetWidth + 'px';
            }
        }
    }
}

// 健康保険料を更新する関数
function updateHealthInsurance() {
    const selectedType = document.getElementById('health-insurance-type').value;
    const selectedAge = document.getElementById('age-select').value;
    
    // 入力された所得で計算
    const newValue = calculateHealthInsurance(selectedType, selectedAge, currentIncome);
    document.getElementById('health-insurance').value = newValue;
    deductions.healthInsurance = newValue;
    
    // 更新
    calculateTaxes();
    updateTable();
    drawTaxRateChart();
    updateBreakdown();
}

// DOMがロードされたら実行
document.addEventListener('DOMContentLoaded', function() {
    console.log('ページ読み込み完了');
    
    // 入力フィールドに初期値をセット
    document.getElementById('current-income').value = currentIncome;
    document.getElementById('basic-deduction').value = deductions.basicDeduction;
    document.getElementById('blue-deduction').value = deductions.blueDeduction;
    document.getElementById('health-insurance-type').value = 'kokuho';
    document.getElementById('health-insurance').value = deductions.healthInsurance;
    document.getElementById('pension').value = deductions.pension;
    document.getElementById('small-business').value = deductions.smallBusiness;
    document.getElementById('family-salary').value = deductions.familySalary;
    
    // 所得入力時のイベントリスナー
    document.getElementById('current-income').addEventListener('change', function() {
        currentIncome = parseFloat(this.value) || 0;
        updateHealthInsurance();
        updateIncomeSelectOptions();
    });
    
    // 健康保険の種類選択時のイベントリスナー
    document.getElementById('health-insurance-type').addEventListener('change', function() {
        updateHealthInsurance();
        updateHealthInsuranceTooltip();
    });
    
    // 年齢区分選択時のイベントリスナー
    document.getElementById('age-select').addEventListener('change', function() {
        updateHealthInsurance();
        updateHealthInsuranceTooltip();
    });
    
    // 所得選択のイベントリスナー
    document.getElementById('income-select').addEventListener('change', function() {
        updateBreakdown();
    });
    
    // 計算ボタンのイベントリスナー
    document.getElementById('calculate-btn').addEventListener('click', function() {
        console.log('計算ボタンクリック');
        currentIncome = parseFloat(document.getElementById('current-income').value) || 5000000;
        updateDeductions();
        calculateTaxes();
        updateTable();
        drawTaxRateChart();
        updateBreakdown();
        updateIncomeSelectOptions();
    });
    
    // リセットボタンのイベントリスナー
    document.getElementById('reset-btn').addEventListener('click', function() {
        console.log('リセットボタンクリック');
        resetDeductions();
        calculateTaxes();
        updateTable();
        drawTaxRateChart();
        updateBreakdown();
        updateIncomeSelectOptions();
    });
    
    // 表示更新時に列幅を調整
    window.addEventListener('resize', adjustColumnWidths);
    
    // 初期計算と表示
    calculateTaxes();
    updateTable();
    
    // グラフを描画（少し遅延させることでDOMの準備を待つ）
    setTimeout(function() {
        drawTaxRateChart();
        
        // 所得プルダウンの初期値をその場で設定するのではなく、現在の所得値に合わせる
        document.getElementById('income-select').value = currentIncome.toString();
        updateBreakdown();
        
        updateIncomeSelectOptions();
        updateHealthInsuranceTooltip();
    }, 100);
});
