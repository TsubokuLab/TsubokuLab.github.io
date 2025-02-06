---

layout: default  
title: Virtual Motion Sender  
tagline: SteamVRのトラッカー・コントローラーの位置や入力を別PCに複製転送するアプリ</br><a href="http://translate.google.com/translate?hl=ja&sl=auto&tl=en&u=http%3A%2F%2Fgithub.teruaki-tsubokura.com%2Fvirtualmotionsender%2F" style="color:white;text-decoration:underline;">English(Google Translate)</a>
description: "SteamVRのトラッカー・コントローラーの位置や入力を別PCに複製転送するアプリ"
image: http://github.teruaki-tsubokura.com/virtualmotionsender/images/thumbnail.png
---

<div class="iframe-responsive"><iframe width="832" height="468" src="https://www.youtube.com/embed/PCnYJPk400I" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="iframe"></iframe></div>

-----

![icon256px.png](images/icon256px.png)

* [概要](#概要)
* [仕組み](#仕組み)
* [内容物](#内容物)
* [使い方](#使い方)
  * [1. デバイスの接続](#1-デバイスの接続)
  * [2. アプリの起動](#2-アプリの起動)
  * [3. キャプチャアプリケーションを選択](#3-キャプチャアプリケーションを選択)
  * [4. 設定するデバイスの選択](#4-設定するデバイスの選択)
  * [5. デバイスの振動を有効にする](#5-デバイスの振動を有効にする)
  * [6. 振動強度を変更](#6-振動強度を変更)
  * [7. アプリのClip位置を調節する](#7-アプリのClip位置を調節する)
  * [8. アプリケーションを終了する](#8-アプリケーションを終了する)
* [VRCHaptics対応アバターセットアップ手順](#vrchaptics対応アバターセットアップ手順)
  * [1. 通常通りVRChatアバターを用意する](#1-通常通りvrchatアバターを用意する)
  * [2. VRCHapticsAssets.unitypackageをインポートする](#2-vrchapticsassetsunitypackageをインポートする)
  * [3. VRCHapticsHelperを使用して触覚デバイス用Prefabを追加](#3-VRCHapticsHelperを使用して触覚デバイス用Prefabを追加)
  * [4. VRCHapticsHelperを使ってアバターをセットアップする](#4-vrchapticshelperを使ってアバターをセットアップする)
  * [5. アバターをVRChatにアップロードし、動作確認する](#5-アバターをvrchatにアップロードし動作確認する)
* [デモワールド](#デモワールド)
* [推奨動作環境](#推奨動作環境)
* [【重要】使用前の注意事項](#重要使用前の注意事項)
* [利用規約](#利用規約)
* [VRCHaptics利用者コミュニティ](#VRCHaptics利用者コミュニティ)
* [クレジット](#クレジット)

-----

## 概要

SteamVRのトラッカー・コントローラーの位置や入力を別PCに複製転送するアプリ




**Download：[https://tsubokulab.fanbox.cc/posts/1205829](https://tsubokulab.fanbox.cc/posts/1205829)**  
※VRCHapticsは現在クローズドテスト中です。pixivFANBOX 500円以上の支援者へ限定公開しています。

**Updates：[更新履歴](https://github.teruaki-tsubokura.com/virtualmotionsender/changelog)**  
2025/02/06 --- v0.0.1 公開


## 仕組み

![VRCHaptics_system.png](images/VRCHaptics_system.png)

1. 触覚ベストやアームデバイスに接近したオブジェクトをVRChat上のアバターカメラで撮影し、RenderTextureを画面上の固定位置に表示
2. そのRenderTextureをVRCHapticsアプリで画面キャプチャー
3. 色情報→振動に変換してbHapticsデバイスを制御

## 内容物

- VirtualMotionSender.exe --- アプリ本体

## 使い方

### 1. デバイスの接続

1. **bHaptics公式サイト**から**[bHaptics Player](https://www.bhaptics.com/download)**アプリをインストールし起動

2. **歯車マーク**をクリックして設定画面を表示する  
   ![bHapticsPlayer_05](images\bHapticsPlayer_05.png)

3. デバイスの電源ボタンを押していき、**Scanned Devices**に表示されたら**Pair**ボタンを押下してペアリングを完了させる。  
   ![bHapticsPlayer_01](images\bHapticsPlayer_01.png)

4. ペアリングが完了するとデバイスのアイコンに色が着く  
   ![bHapticsPlayer_03](images\bHapticsPlayer_03.png)

5. もし腕デバイス(Tactosy)が2台とも右手に設定されたりした場合は、下部の**Device Position**で変更する。  
   ![bHapticsPlayer_02](images\bHapticsPlayer_02.png)

これでデバイスの準備は完了です。  

### 2. アプリの起動

1. **VRCHaptics.exe**を起動  
   ![VRCHaptics_01](images\VRCHaptics_01.png)

### 3. キャプチャアプリケーションを選択

起動後、場合によってはキャプチャするアプリケーションにVRChatが選択されていない事があります。
その場合は以下の手順でVRChatを選択して下さい。

1. 上部のマウスカーソルを合わせると「Change Application」と表示される赤枠の部分でマウスを左クリック  
   ![VRCHaptics_02](images\VRCHaptics_02.png)

2. 起動中のアプリケーション一覧が表示されるので、一覧から起動中のVRChatを選択する。  
   ![VRCHaptics_03](images\VRCHaptics_03.png)

## 推奨動作環境
* Windows10
* GPU: Nvidia GeForce GTX1060 以上
* CPU: Intel Core i7 以上

## 【重要】使用前の注意事項


## 利用規約

* 個人利用に限り商用利用可能（法人利用はお問い合わせ下さい）
* VTuberの配信やロケーションベースVRアトラクション、研究開発等ご自由にお使い下さい。
* アプリ本体の再配布は不可
* 迷惑行為や宗教・政治活動への利用は不可
* 本データの利用によって生じた損害等の一切の責任を負いかねます

## VRCHaptics利用者コミュニティ

有志のVRCHapticsユーザーが作ってくれたDiscordサーバーがあります。
情報交換などはこちらへどうぞ。

* 触覚スーツ愛好会  
  [https://discord.gg/FHZ2nbF](https://discord.gg/FHZ2nbF)

## クレジット

当アプリの受信PCの仮想トラッカードライバーには、@gpsnmeajp様 の **Virtual Motion Tracker** を使用させて頂いています。

* Virtual Motion Tracker (MITライセンス)  
  [https://gpsnmeajp.github.io/VirtualMotionTrackerDocument/](https://gpsnmeajp.github.io/VirtualMotionTrackerDocument/)


