/**
 * 税負担シミュレーター 単純化したグラフ描画モジュール
 */

window.TaxSimpleChart = (function() {
    // 色の定義
    const colors = {
        line: '#4a6fa5',      // 折れ線グラフの線
        point: '#ff9e3d',     // データポイント
        currentMarker: '#ff9e3d',  // 現在の所得マーカー
        
        // 円グラフの色
        takeHome: '#27ae60',      // 手取り
        incomeTax: '#e74c3c',     // 所得税
        residenceTax: '#3498db',  // 住民税
        healthInsurance: '#f39c12', // 健康保険料
        pension: '#16a085',       // 年金保険料
        consumptionTax: '#9b59b6' // 消費税
    };
    
    /**
     * 税負担率グラフを描画する関数
     */
    function drawTaxRateChart(taxResultsArray, currentIncome) {
        console.log('シンプル版グラフ描画開始');
        console.log('データ配列:', taxResultsArray);

        // SVG要素を取得してクリア
        const svg = d3.select('#tax-chart');
        svg.selectAll('*').remove();
        
        // データがない場合は終了
        if (!taxResultsArray || !taxResultsArray.length) {
            console.error('グラフデータがありません');
            displayNoDataMessage(svg, 'データがありません');
            return;
        }
        
        try {
            // グラフサイズと余白の設定
            const width = parseInt(svg.style('width')) || 800;
            const height = 400;
            const margin = {top: 30, right: 30, bottom: 50, left: 60};
            const innerWidth = width - margin.left - margin.right;
            const innerHeight = height - margin.top - margin.bottom;
            
            console.log(`グラフサイズ: ${width}x${height}`);
            
            // データのソート
            const taxResults = [...taxResultsArray].sort((a, b) => a.income - b.income);
            
            // グラフ描画エリア
            const chart = svg.append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);
            
            // X軸の設定
            const xScale = d3.scaleLinear()
                .domain([0, d3.max(taxResults, d => d.income)])
                .range([0, innerWidth]);
                
            // 表示する目盛り値を設定（100万円と500万円を追加）
            const xTicks = [1000000, 5000000, 10000000, 20000000, 30000000, 40000000, 50000000, 60000000];
            
            // Y軸の設定 (0-70%)
            const yScale = d3.scaleLinear()
                .domain([0, 70])
                .range([innerHeight, 0]);
                
            // 背景に水平グリッドラインのみを追加
            chart.append('g')
                .attr('class', 'grid')
                .attr('opacity', 0.1)
                .selectAll('line.horizontal')
                .data(yScale.ticks(7))
                .enter()
                .append('line')
                .attr('class', 'horizontal')
                .attr('x1', 0)
                .attr('x2', innerWidth)
                .attr('y1', d => yScale(d))
                .attr('y2', d => yScale(d))
                .attr('stroke', '#000');
            
            // X軸の描画
            chart.append('g')
                .attr('transform', `translate(0,${innerHeight})`)
                .call(d3.axisBottom(xScale)
                    .tickValues(xTicks)
                    .tickFormat(d => {
                        if (d >= 10000000) return `${d/10000000}千万`;
                        return `${d/10000}万`;
                    })
                );
            
            // Y軸の描画
            chart.append('g')
                .call(d3.axisLeft(yScale)
                    .tickFormat(d => `${d}%`)
                    .ticks(7)
                );
            
            // X軸ラベル
            chart.append('text')
                .attr('x', innerWidth / 2)
                .attr('y', innerHeight + 40)
                .attr('text-anchor', 'middle')
                .text('所得金額（円）');
            
            // Y軸ラベル
            chart.append('text')
                .attr('transform', 'rotate(-90)')
                .attr('x', -innerHeight / 2)
                .attr('y', -40)
                .attr('text-anchor', 'middle')
                .text('実質税負担率（%）');
            
            // 折れ線の描画
            const line = d3.line()
                .x(d => xScale(d.income))
                .y(d => yScale(parseFloat(d.taxRate)))
                .curve(d3.curveMonotoneX);
            
            chart.append('path')
                .datum(taxResults)
                .attr('fill', 'none')
                .attr('stroke', colors.line)
                .attr('stroke-width', 3)
                .attr('d', line);
            
            // データポイントの描画とパーセント数値表示
            chart.selectAll('.data-point')
                .data(taxResults)
                .enter()
                .append('circle')
                .attr('class', 'data-point')
                .attr('cx', d => xScale(d.income))
                .attr('cy', d => yScale(parseFloat(d.taxRate)))
                .attr('r', 4)
                .attr('fill', colors.point);
                
            // 全てのデータポイントにパーセント値を表示
            // 角度を計算して位置をスマートに調整
            chart.selectAll('.percent-label')
                .data(taxResults)
                .enter()
                .append('text')
                .attr('class', 'percent-label')
                .attr('x', d => xScale(d.income))
                .attr('y', d => yScale(parseFloat(d.taxRate)) - 8) // データポイントの上に配置
                .attr('text-anchor', 'middle')
                .attr('font-size', '10px')
                .attr('font-weight', d => d.income === currentIncome ? 'bold' : 'normal')
                .attr('fill', d => d.income === currentIncome ? colors.currentMarker : '#333')
                .text(d => `${d.taxRate}%`)
                .style('opacity', d => {
                    // 100万円、200万円、500万円、1000万円、2000万円、現在の所得のみ表示
                    const million = d.income / 10000;
                    return (million === 100 || million === 200 || million === 500 || 
                            million === 1000 || million === 2000 || d.income === currentIncome) ? 1 : 0;
                });
            
            // 現在の所得のマーカー
            if (currentIncome) {
                const currentData = taxResults.find(d => d.income === currentIncome);
                if (currentData) {
                    const currentTaxRate = parseFloat(currentData.taxRate);
                    
                    // 垂直線
                    chart.append('line')
                        .attr('x1', xScale(currentIncome))
                        .attr('y1', 0)
                        .attr('x2', xScale(currentIncome))
                        .attr('y2', innerHeight)
                        .attr('stroke', colors.currentMarker)
                        .attr('stroke-width', 2)
                        .attr('stroke-dasharray', '5,5');
                    
                    // マーカー
                    chart.append('circle')
                        .attr('cx', xScale(currentIncome))
                        .attr('cy', yScale(currentTaxRate))
                        .attr('r', 6)
                        .attr('fill', colors.currentMarker);
                    
                    // プロット上のラベルに背景付きポップアップスタイルを適用
                    // 背景ボックスを先に描画
                    chart.append('rect')
                        .attr('x', xScale(currentIncome) - 100) // ラベルの長さに合わせて調整
                        .attr('y', 5)
                        .attr('width', 200) // ラベルの長さに合わせて調整
                        .attr('height', 26) // 縦幅を1.2倍程度に拡大
                        .attr('rx', 6) // 角丸
                        .attr('ry', 6) // 角丸
                        .attr('fill', 'rgba(255, 255, 255, 0.9)')
                        .attr('stroke', colors.line) // テーマ色の青色を使用
                        .attr('stroke-width', 1.5);
                    
                    // ラベルのテキスト - 「現在の」を削除
                    chart.append('text')
                        .attr('x', xScale(currentIncome))
                        .attr('y', 22) // 背景の高さに合わせて位置調整
                        .attr('text-anchor', 'middle')
                        .attr('font-weight', 'bold')
                        .attr('fill', colors.line) // テーマ色の青色を使用
                        .text(`所得: ${(currentIncome/10000).toFixed(0)}万円 (${currentTaxRate}%)`);
                }
            }
            
            console.log('グラフ描画完了');
        } catch (error) {
            console.error('グラフ描画エラー:', error);
            displayNoDataMessage(svg, 'グラフの描画に失敗しました');
        }
    }
    
    /**
     * 税金内訳の円グラフを描画する関数
     */
    function drawTaxBreakdownPie(taxData) {
        console.log('円グラフ描画開始:', taxData);
        
        // SVG要素を取得してクリア
        const svg = d3.select('#pie-chart');
        svg.selectAll('*').remove();
        
        // データがない場合は終了
        if (!taxData) {
            console.error('円グラフ用データがありません');
            displayNoDataMessage(svg, 'データがありません');
            return;
        }
        
        try {
            // グラフサイズの設定
            const width = 300;
            const height = 300;
            const radius = Math.min(width, height) / 2;
            
            // 円グラフエリア
            const chart = svg.append('g')
                .attr('transform', `translate(${width / 2},${height / 2})`);
            
            // 円グラフ用データ作成
            const pieData = [
                { name: "手取り", value: taxData.takeHome, color: colors.takeHome },
                { name: "所得税", value: taxData.incomeTax, color: colors.incomeTax },
                { name: "住民税", value: taxData.residenceTax, color: colors.residenceTax },
                { name: "健康保険料", value: taxData.healthInsurance, color: colors.healthInsurance },
                { name: "年金保険料", value: taxData.pension, color: colors.pension },
                { name: "消費税", value: taxData.consumptionTax, color: colors.consumptionTax }
            ];
            
            // 円グラフの設定
            const pie = d3.pie()
                .value(d => d.value)
                .sort(null);
            
            const arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radius - 10);
            
            // 円グラフのセグメント描画とアニメーション
            const arcs = chart.selectAll('arc')
                .data(pie(pieData))
                .enter()
                .append('g');
            
            // パラメータを取得する関数
            // 円の内側、円周近くに配置するための位置計算
            function getPositionInPie(d) {
                // arc.centroid から半径の75%位置に調整
                const centroid = arc.centroid(d);
                const midAngle = Math.atan2(centroid[1], centroid[0]);
                const x = Math.cos(midAngle) * (radius * 0.7); // 半径の70%位置
                const y = Math.sin(midAngle) * (radius * 0.7);
                return [x, y];
            }
            
            arcs.append('path')
                .attr('d', arc)
                .attr('fill', d => d.data.color)
                .attr('stroke', 'white')
                .attr('stroke-width', 2)
                .style('opacity', 0.9)
                // アニメーション：中心からの広がりとフェードイン
                .attr('transform', 'scale(0)')
                .style('opacity', 0)
                .transition()
                .duration(600)
                .attr('transform', 'scale(1)')
                .style('opacity', 1)
                // 処理順に間隔を税を与えて順番に表示
                .delay((d, i) => i * 80)
                // 回転アニメーションも付ける
                .attrTween('d', function(d) {
                    const i = d3.interpolate({startAngle: d.startAngle, endAngle: d.startAngle}, d);
                    return function(t) { return arc(i(t)); };
                });
                
            // パーセント表示（大きい項目のみ）
            const total = pieData.reduce((sum, item) => sum + item.value, 0);
            
            arcs.filter(d => (d.data.value / total) > 0.05)
                .append('text')
                .attr('transform', d => {
                    // 円の内側に配置する位置を計算
                    const pos = getPositionInPie(d);
                    return `translate(${pos[0]}, ${pos[1]})`;
                })
                .attr('text-anchor', 'middle')
                .attr('fill', 'white') // 円の内部なので白色に戻す
                .attr('font-weight', 'bold')
                .attr('font-size', '12px')
                .style('opacity', 0) // 初期は非表示
                .text(d => `${(d.data.value / total * 100).toFixed(1)}%`)
                .style('text-shadow', '1px 1px 2px rgba(0,0,0,0.8)') // 黒のテキスト影で視認性向上
                // 遅延してフェードイン
                .transition()
                .delay(800) // 円の描画後に表示
                .duration(300)
                .style('opacity', 1);
                
            console.log('円グラフ描画完了');
        } catch (error) {
            console.error('円グラフ描画エラー:', error);
            displayNoDataMessage(svg, '円グラフの描画に失敗しました');
        }
    }
    
    /**
     * 詳細データの表示を更新する関数
     */
    function updateBreakdownDetails(taxData) {
        if (!taxData) return;
        
        // 各項目の金額を更新
        document.getElementById('take-home-amount').textContent = '¥' + taxData.takeHome.toLocaleString();
        document.getElementById('income-tax-amount').textContent = '¥' + taxData.incomeTax.toLocaleString();
        document.getElementById('residence-tax-amount').textContent = '¥' + taxData.residenceTax.toLocaleString();
        document.getElementById('health-insurance-amount').textContent = '¥' + taxData.healthInsurance.toLocaleString();
        document.getElementById('pension-amount').textContent = '¥' + taxData.pension.toLocaleString();
        document.getElementById('consumption-tax-amount').textContent = '¥' + taxData.consumptionTax.toLocaleString();
        document.getElementById('tax-rate-value').textContent = taxData.taxRate + '%';
    }
    
    /**
     * データがない場合のメッセージを表示する関数
     */
    function displayNoDataMessage(svg, message) {
        const width = parseInt(svg.style('width')) || 300;
        const height = parseInt(svg.style('height')) || 300;
        
        svg.append('text')
            .attr('x', width / 2)
            .attr('y', height / 2)
            .attr('text-anchor', 'middle')
            .attr('font-size', '14px')
            .text(message || 'データがありません');
    }
    
    // 公開する関数
    return {
        drawTaxRateChart,
        drawTaxBreakdownPie,
        updateBreakdownDetails
    };
})();
