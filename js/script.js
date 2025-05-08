// DOM要素
const loader = document.querySelector('.loader');
const projectsContainer = document.getElementById('projects-container');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectTemplate = document.getElementById('project-card-template');
const heroParticles = document.querySelector('.particles');

// リポジトリデータのキャッシュ
let repositories = [];
let filteredRepos = [];
let currentFilter = 'all';

// ページ読み込み時の処理
document.addEventListener('DOMContentLoaded', () => {
    // パーティクルの生成
    generateParticles();
    
    // データの読み込み
    fetchRepositories();
    
    // フィルターボタンのイベントリスナー
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filterProjects(filter);
            
            // アクティブクラスの切り替え
            filterButtons.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    // アニメーションのためにスクロールイベントを監視
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const projects = document.querySelectorAll('.project-card');
        
        projects.forEach((project, index) => {
            const top = project.getBoundingClientRect().top;
            project.style.animationDelay = `${index * 0.1}s`;
            
            if (top < window.innerHeight - 100) {
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
            }
        });
    });
});

// リポジトリデータを取得する関数
async function fetchRepositories() {
    try {
        const response = await fetch('repositories.json');
        const data = await response.json();
        
        repositories = data.repositories;
        filteredRepos = [...repositories];
        
        renderProjects(repositories);
        hideLoader();
    } catch (error) {
        console.error('リポジトリデータの読み込みに失敗しました:', error);
        hideLoader();
    }
}

// プロジェクトをフィルタリングする関数
function filterProjects(filter) {
    currentFilter = filter;
    
    if (filter === 'all') {
        filteredRepos = [...repositories];
    } else {
        filteredRepos = repositories.filter(repo => {
            return repo.tags.includes(filter);
        });
    }
    
    renderProjects(filteredRepos);
}

// プロジェクトを表示する関数
function renderProjects(projectsData) {
    projectsContainer.innerHTML = '';
    
    projectsData.forEach((project, index) => {
        const projectCard = document.importNode(projectTemplate.content, true);
        
        // 要素を取得
        const title = projectCard.querySelector('.project-title');
        const description = projectCard.querySelector('.project-description');
        const thumbnail = projectCard.querySelector('.project-thumbnail img');
        const tagsContainer = projectCard.querySelector('.project-tags');
        const dateEl = projectCard.querySelector('.project-date');
        const viewBtn = projectCard.querySelector('.view-btn');
        const repoBtn = projectCard.querySelector('.repo-btn');
        const card = projectCard.querySelector('.project-card');
        
        // データをセット
        title.textContent = project.name;
        description.textContent = project.description;
        thumbnail.src = project.thumbnail || 'images/placeholder.svg';
        thumbnail.alt = project.name;
        dateEl.textContent = formatDate(project.date);
        viewBtn.href = project.url;
        repoBtn.href = `https://github.com/TsubokuLab/${project.repo}`;
        
        // タグの生成
        project.tags.forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.classList.add('project-tag');
            tagEl.textContent = tag;
            tagsContainer.appendChild(tagEl);
        });
        
        // アニメーション用のディレイ
        card.style.animationDelay = `${index * 0.1}s`;
        
        projectsContainer.appendChild(projectCard);
    });
    
    // プロジェクトが0件の場合のメッセージ
    if (projectsData.length === 0) {
        const noProjects = document.createElement('div');
        noProjects.classList.add('no-projects');
        noProjects.textContent = `${currentFilter} タグのプロジェクトは見つかりませんでした。`;
        projectsContainer.appendChild(noProjects);
    }
}

// ローダーを非表示にする関数
function hideLoader() {
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 500);
}

// 日付をフォーマットする関数
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}年${month}月${day}日`;
}

// ヒーローセクションのパーティクルを生成する関数
function generateParticles() {
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        const x = Math.random() * 500;
        const y = Math.random() * 200;
        const radius = Math.random() * 4 + 2;
        
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", radius);
        
        // アニメーション用のCSS変数を設定
        circle.style.setProperty('--tx', `${Math.random() * 20 - 10}px`);
        circle.style.setProperty('--ty', `${Math.random() * 20 - 10}px`);
        circle.style.setProperty('--duration', `${Math.random() * 3 + 3}s`);
        
        // CSSアニメーションを適用
        circle.style.animation = `float var(--duration) ease-in-out infinite alternate`;
        
        heroParticles.appendChild(circle);
    }
}

// パーティクルのフロートアニメーション
const floatKeyframes = `
@keyframes float {
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(var(--tx), var(--ty));
    }
}
`;

// スタイルタグにキーフレームを追加
const style = document.createElement('style');
style.textContent = floatKeyframes;
document.head.appendChild(style);