# 햄버거 찾기(burger-finder)

  ><h3>원하는 조합의 버거를 만들면, 비슷한 조합의 햄버거를 찾습니다.<h3><h4><del>사실은 햄버거 찾는 게임...<del></h4>

<br>

- 재료 추가하기(add-ingredient)는 대충 완성이 된 것 같음.
  
- 만들어진 버거를 서버에 등록해서 버거를 찾는 로직을 추가해야함. 바로 해도 될듯?
    - 다양한 시중의 버거의 재료를 **데이터로 만들어야 하고**, 이 데이터에 맞추어서 **만들어진 버거의 재료와 비교할 수 있는 로직이 필요**함. ~~여기에 자바스크립트? 아니면 Node.js 환경에 적용할 수 있는 머신러닝 패키지(?) 혹은 개발 환경이 있는지 알아봐야 할듯. 햄버거 사진을 수 백장 주고, 그걸로 재료를 구분하도록 훈련시킬 수 있다면?????~~
        - TensorFlow를 고려했으나, 최종적으로 보류함. 이유는, 머신러닝은 정확한 답을 찾아내는 것이 아닌, 거대한 데이터에서 비슷한 추정치를 찾아낼 수 있는 알고리즘을 만드는 데에 사용됌. 이 앱은 입력한 데이터 값을 특정 데이터 값과 단순 비교하는 과정이 필요하므로, 머신러닝이 꼭 필요한가, 하는 의문이 들었음. 예를 들어, '햄버거 빵 3개와 고기패티 2개, 치즈 1장, 양상추 1장'이라는 데이터를 입력 받으면 이 데이터의 구조와 비슷한 구조의 햄버거 데이터들과 일대일 비교를 통해 가장 비슷한 데이터 구조를 가진 햄버거 데이터를 찾아내는 것인데, 이 부분에서 인공지능이 필요하느냐는 것임.
        - 버거 찾는 알고리즘 만드는 중
            - [x]  사용자가 입력하는 재료를 미리 입력된 버거 데이터와 비교할 때 재료의 종류가 다른(종류의 수가 일치하지 않을 때) 경우에도 알고리즘이 정상적으로 작동하는지 확인하기
                - 사용자가 입력하는 재료와 미리 입력된 버거 데이터의 항목의 개수와 종류(이름)을 일치시켰다. 굳이 달라야할 필요가 있나 싶었음.
        - 버거 알고리즘은 완성된 것 같다! (2021-03-10)
            - [x]  찾은 버거 목록 이쁘게 만들기
            - [x]  '버거만들기' 루트(route) 만들어 주기
        - 간소한 버거 알고리즘의 완성으로, 이제 버거의 재료를 고르고, 만들어진 버거를 분석하는 과정까지 가능해졌다. 분석 후, 가장 비슷한 버거가 무엇인지 결과를 나타내주는 페이지도 만든 상태. 비슷한 버거를 1위부터 3위까지 볼 수 있음. 각 버거를 누르면 모달 창이 생성됌.
            - [x]  각 모달창에서 해당 버거의 실제 버거(현실에 있는, 버거)의 정보가 있는 웹페이지 등으로 이동하게끔, 링크 추가 필요함.
            - [x]  각 버거의 랭크 및 스코어에 대한 세련된 표현 필요(숫자가 아닌, 문장 등 직관적이지 않은 표현으로!).
    - [ ]  각 브랜드 버거를 브랜드별로 2개씩, 나만의 버거를 5개 이상 추가하기.
- ~~**만든 버거를 따로 저장하는 기능을 추가할 것인가** 고민. 추가한다면 구글 인증 등을 추가해서 자체적으로 유저 생성이 가능하도록 해야함.~~
    - 결국 유저 인증을 추가하기로 했습니다...🎉
    - firebase 이용할 예정.
    - node-sass가 node 버전과 충돌이 있어, scss에서 normal css로 돌아갑니다.(2021.04.16)
      - 이리저리 헤메다가, 끝내 구글 로그인을 추가했습니다. firebase와 관련된 패키지를 설치하지 않고 REST API 방식으로만 구현하겠다는 고집을 부리다가...너무 오래 걸린 듯..(2021.04.26)
        - [x] 로그인 후, 주어진 데이터를 바탕으로 유저의 프로필 페이지 보여주기.
        - [x] ~~cookie에 auth-data 저장.~~ localStroage로 변경
        - [x] ~~http-request-hook 추가.~~ auth-hook 추가
        - [x] auth-context에는 auth와 관련된 상태 및 유저 정보만 저장하도록.
        - [ ] Loading Spinner 추가.
        - [x] 로그아웃 기능 추가하기.
        - [ ] 이메일로 회원가입할 때, 이메일 확인 링크를 해당 이메일 주소로 보내는 기능 넣기.
        - [ ] 이메일로 가입한 회원과 구글로 로그인한 회원 간에 충돌 여부 확인 해보기(이메일이 같을 때).