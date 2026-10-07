/* 공통영어 - 독해 유형별 문제은행 (지문은 기출 유형을 본뜬 창작 지문) */
(function () {
  const T1 = '글의 주제·요지';
  const T2 = '빈칸 추론';
  const T3 = '어법';
  const T4 = '어휘(낱말의 쓰임)';
  const T5 = '문장 삽입';
  const T6 = '내용 일치·불일치';
  const T7 = '요약문 완성';
  const T8 = '연결어(흐름)';
  const T9 = '서술형(영작)';
  const L = [];
  const POS = ['①', '②', '③', '④', '⑤'];

  L.push({
    type: T1, pts: 3,
    passage: 'Many people believe that being busy means being productive. However, researchers who study work habits have found that long hours do not always lead to better results. In one study, employees who took a short break every hour completed more tasks and made fewer mistakes than those who worked without stopping. The brain, like a muscle, needs rest to function well. Therefore, scheduling regular breaks is not a waste of time but a smart strategy for keeping our focus and energy.',
    stem: '다음 글의 주제로 가장 적절한 것은?',
    choices: ['Why long working hours increase productivity', 'The benefits of taking regular breaks during work', 'How to build muscle through exercise', 'Ways to make fewer mistakes by studying harder', 'The importance of finishing tasks before the deadline'], ans: 2,
    explain: '긴 근무가 항상 생산적인 것은 아니며 규칙적인 휴식이 집중력과 에너지를 유지하는 현명한 전략이라는 내용이므로 ②가 주제이다.'
  });

  L.push({
    type: T2, pts: 3.4,
    passage: 'When we learn a new language, we often fear making mistakes. Yet mistakes are not signs of failure; they are evidence that we are trying. Each error shows us what we do not yet know, and correcting it helps new knowledge stay in our memory longer. In other words, ______________________.',
    stem: '다음 빈칸에 들어갈 말로 가장 적절한 것은?',
    choices: ['making mistakes is an important part of learning', 'only perfect speakers can improve their skills', 'learning a language is possible without effort', 'fear of failure makes us learn faster', 'memory is not related to language learning'], ans: 1,
    explain: '실수는 실패의 신호가 아니라 노력의 증거이며, 오류를 고치는 과정이 기억에 도움이 된다는 내용이므로 “실수는 배움의 중요한 부분이다”가 들어간다.'
  });

  L.push({
    type: T3, pts: 3.2,
    passage: 'Sleep plays an important role in our health. While we sleep, our body ① repairs itself, and our brain organizes the information that we ② have learned during the day. People who do not get enough sleep often find it difficult ③ concentrating on their tasks. Experts recommend that teenagers ④ sleep for eight to ten hours every night. Getting enough sleep ⑤ is as important as eating well and exercising.',
    stem: '다음 글의 밑줄 친 부분 중, 어법상 적절하지 않은 것은? (①~⑤ 번호가 붙은 부분을 살펴보세요.)',
    choices: POS, posChoices: true, shuffle: false, ans: 3,
    explain: '‘find it difficult to concentrate’처럼 가목적어 it과 진목적어 to부정사를 쓴다. ③ concentrating → to concentrate가 되어야 한다.'
  });

  L.push({
    type: T4, pts: 3,
    passage: 'Plastic pollution is one of the most ① serious environmental problems today. Every year, millions of tons of plastic waste end up in the oceans, where it ② harms marine animals. Many sea turtles, for example, mistake plastic bags for jellyfish and ③ swallow them. To solve this problem, we should ④ increase the use of single-use plastics and recycle more. Even small actions, such as bringing our own bags, can ⑤ make a difference.',
    stem: '다음 글의 밑줄 친 부분 중, 문맥상 낱말의 쓰임이 적절하지 않은 것은?',
    choices: POS, posChoices: true, shuffle: false, ans: 4,
    explain: '플라스틱 오염 문제를 해결하기 위해서는 일회용 플라스틱 사용을 늘리는(increase)이 아니라 줄여야(reduce) 한다.'
  });

  L.push({
    type: T5, pts: 3.4,
    passage: 'The small mountain village had been losing residents for decades. ① Young people moved to cities to find better jobs, and many shops closed. ② Then the village started a festival that celebrated its famous apples. ③ Visitors from all over the country came to enjoy the food and music. ④ Local farmers sold more apples, and new cafés and guesthouses opened. ⑤ Today, the festival is held every autumn.',
    box: 'As a result, the village’s population began to grow again.', boxTitle: '주어진 문장',
    stem: '글의 흐름으로 보아, 주어진 문장이 들어가기에 가장 적절한 곳은?',
    choices: POS, posChoices: true, shuffle: false, ans: 5,
    explain: '‘As a result’는 앞에 원인이 있어야 한다. 축제 덕분에 농가 수입이 늘고 새 가게들이 생겼다는 ④ 뒤에서 마을 인구가 다시 늘기 시작했다는 결과가 이어진다.'
  });

  L.push({
    type: T6, pts: 2.8,
    passage: 'Marie Curie was born in Warsaw, Poland, in 1867. At the age of 24, she moved to Paris to study physics and mathematics at the Sorbonne. With her husband Pierre, she discovered two new elements, polonium and radium. In 1903, she won the Nobel Prize in Physics, and in 1911 she won the Nobel Prize in Chemistry. She was the first person to win Nobel Prizes in two different scientific fields.',
    stem: '다음 글의 내용과 일치하는 것은?',
    choices: ['Marie Curie was born in Paris.', 'She moved to Paris at the age of 14.', 'She discovered polonium and radium with her husband.', 'She won the Nobel Prize in Chemistry in 1903.', 'She won Nobel Prizes twice in the same field.'], ans: 3,
    explain: '남편 피에르와 함께 폴로늄과 라듐을 발견했다고 했다. 태어난 곳은 바르샤바, 파리로 간 나이는 24세, 화학상은 1911년, 두 개의 다른 분야에서 수상했다.'
  });

  L.push({
    type: T7, pts: 3.6,
    passage: 'People often compare themselves with others on social media, where everyone seems to be happy. But what we see online is only a carefully chosen part of someone’s life. Users tend to share their best moments and hide their difficulties. As a result, viewers may feel that their own lives are less satisfying.\n\n↓\n\nSocial media users usually (A) ________ only positive moments of their lives, which can make viewers feel (B) ________ about their own lives.',
    stem: '위 글의 내용을 한 문장으로 요약하고자 한다. 빈칸 (A), (B)에 들어갈 말로 가장 적절한 것은?',
    choices: ['(A) share – (B) dissatisfied', '(A) hide – (B) proud', '(A) share – (B) satisfied', '(A) ignore – (B) confident', '(A) delete – (B) comfortable'], ans: 1, shuffle: false,
    explain: '사용자들은 최고의 순간만 공유하고(share) 어려움은 숨기므로, 보는 사람은 자신의 삶이 덜 만족스럽다고(dissatisfied) 느낄 수 있다.'
  });

  L.push({
    type: T8, pts: 3,
    passage: 'Many students believe that studying late at night is more effective because it is quiet. (A) ________, research shows that lack of sleep reduces memory and attention. (B) ________, students who sleep well and study during the day often score higher.',
    stem: '다음 글의 빈칸 (A), (B)에 들어갈 말로 가장 적절한 것은?',
    choices: ['However – In contrast', 'For example – In addition', 'Therefore – For instance', 'Similarly – However', 'In other words – As a result'], ans: 1, shuffle: false,
    explain: '(A) 앞은 “밤에 공부하는 것이 효과적이라고 믿는다”, 뒤는 “수면 부족이 기억력을 떨어뜨린다”로 상반되므로 However. (B)는 잠을 못 자는 학생과 잘 자는 학생을 대비하므로 In contrast.'
  });

  L.push({
    type: T3, pts: 3.2,
    passage: 'Last year, our school science club ① held a fair to introduce experiments to younger students. The students ② who projects won prizes were invited to a national contest. One of the projects, ③ which used solar energy to charge phones, attracted much attention. The club members, ④ excited about the result, ⑤ were planning to build a larger model.',
    stem: '다음 글의 밑줄 친 부분 중, 어법상 적절하지 않은 것은?',
    choices: POS, posChoices: true, shuffle: false, ans: 2,
    explain: '‘학생들의 프로젝트’라는 소유 관계를 나타내야 하므로 소유격 관계대명사 whose를 써야 한다. ② who → whose.'
  });

  L.push({
    type: T6, pts: 2.8,
    passage: 'Min-jun loved baking, but he was too shy to share his cookies with others. One day, his sister secretly took some to her school’s bake sale. To Min-jun’s surprise, all the cookies sold out within an hour, and many customers asked for more. Encouraged by this, Min-jun began to sell his cookies every weekend at the local market. Now, he dreams of opening his own bakery someday.',
    stem: '다음 글의 내용과 일치하지 않는 것은?',
    choices: ['Min-jun was too shy to share his cookies.', 'His sister took cookies to the bake sale without telling him.', 'All the cookies were sold within an hour.', 'Min-jun now sells his cookies at the market on weekends.', 'Min-jun already owns his own bakery.'], ans: 5,
    explain: '민준은 “언젠가 자신의 빵집을 여는 것을 꿈꾼다”고 했으므로 이미 빵집을 소유하고 있다는 ⑤는 일치하지 않는다.'
  });

  L.push({
    type: T1, pts: 3,
    passage: 'In many cities, people are turning empty rooftops and small yards into gardens. These gardens provide fresh vegetables, but their benefits go far beyond food. Plants cool the air around buildings, absorb dust, and give a home to insects and birds. Moreover, neighbors who work in the same garden often become friends, which strengthens the sense of community.',
    stem: '다음 글의 요지로 가장 적절한 것은?',
    choices: ['Urban gardens offer various environmental and social benefits.', 'Vegetables from city gardens are cheaper than those in stores.', 'Insects and birds are harmful to city gardens.', 'Gardening is difficult for people living in cities.', 'Rooftops should be used only for building new houses.'], ans: 1,
    explain: '도시 정원이 식량뿐 아니라 환경적(공기 정화, 서식지)·사회적(공동체 의식) 이점을 준다는 내용이다.'
  });

  L.push({
    type: T2, pts: 3.4,
    passage: 'Most people think that a good leader is someone who gives clear orders. However, many successful leaders say that listening is more important than speaking. By listening carefully to team members, a leader can understand problems that would otherwise remain hidden. Team members, in turn, feel respected and become more willing to share ideas. Therefore, a good leader is one who ______________________.',
    stem: '다음 빈칸에 들어갈 말로 가장 적절한 것은?',
    choices: ['listens to others before making decisions', 'speaks louder than everyone else', 'avoids team discussions', 'works alone to save time', 'gives orders without any explanation'], ans: 1,
    explain: '성공한 리더들은 말하기보다 경청이 중요하다고 하고, 경청이 숨은 문제를 파악하게 해 준다고 했으므로 “결정을 내리기 전에 다른 사람의 말을 듣는”이 적절하다.'
  });

  L.push({
    type: T4, pts: 3,
    passage: 'Our ancestors lived without refrigerators, so they developed many ways to ① preserve food. Drying fruit under the sun is a good example. Removing water from food ② prevents bacteria from growing, so it stays fresh for a long time. Another method is salting. Salt draws water out of food, which makes it ③ difficult for bacteria to survive. Today, we can ④ easily store food in refrigerators, but these traditional methods are still used because they add special flavors and ⑤ reduce the taste.',
    stem: '다음 글의 밑줄 친 부분 중, 문맥상 낱말의 쓰임이 적절하지 않은 것은?',
    choices: POS, posChoices: true, shuffle: false, ans: 5,
    explain: '전통적 보존 방법이 여전히 쓰이는 이유는 특별한 풍미를 더하고 맛을 “향상시키기(improve/enhance)” 때문이다. reduce the taste는 문맥에 맞지 않는다.'
  });

  L.push({
    type: T5, pts: 3.4,
    passage: 'Nature has been solving problems for millions of years. ① The lotus leaf, for example, stays clean because water drops roll off its surface and take dust with them. ② Scientists copied this structure to make paints that keep buildings clean. ③ Such examples show that nature can be a great teacher. ④ Many designers now study nature before creating new products. ⑤ Of course, copying nature is not always easy.',
    box: 'Similarly, the skin of sharks inspired swimsuits that reduce water resistance.', boxTitle: '주어진 문장',
    stem: '글의 흐름으로 보아, 주어진 문장이 들어가기에 가장 적절한 곳은?',
    choices: POS, posChoices: true, shuffle: false, ans: 3,
    explain: '‘Similarly’는 앞의 연잎 사례와 비슷한 또 다른 사례를 소개할 때 쓴다. 연잎 사례(①, ②) 다음, 이를 “Such examples”로 묶어 정리하는 문장 앞(③)에 들어가야 한다.'
  });

  L.push({
    type: T3, pts: 3.2,
    passage: 'The museum ① that we visited last week ② has more than ten thousand paintings. Some of them ③ are over four hundred years old, and visitors ④ are not allowed to touch them ⑤ because of they are very fragile.',
    stem: '다음 글의 밑줄 친 부분 중, 어법상 적절하지 않은 것은?',
    choices: POS, posChoices: true, shuffle: false, ans: 5,
    explain: '‘because of’ 뒤에는 명사(구)가 오고, 절(주어+동사)이 올 때는 because를 쓴다. ⑤ because of they are → because they are.'
  });

  // 서술형
  L.push({
    type: T9, pts: 5, kind: 'essay',
    stem: '우리말 해석을 보고 <보기>의 모든 단어와 조건을 활용하여 문장을 완성하시오. [5점]',
    box: '[조건] not until을 사용한 강조구문(It ~ that ...)으로 쓸 것\n[보기] he / that / it / until / last night / was / not / home / late / arrived\n\n우리말: 그는 어젯밤 늦게야 집에 도착했다.', boxTitle: '조건과 보기',
    model: 'It was not until late last night that he arrived home.',
    rubric: ['It was not until ... that ... 구조 (2점)', '모든 단어를 빠짐없이 사용 (2점)', '대소문자·마침표 등 형식 (1점)']
  });

  L.push({
    type: T9, pts: 5, kind: 'essay',
    stem: '우리말 해석을 보고 <보기>의 모든 단어와 조건을 활용하여 문장을 완성하시오. [5점]',
    box: '[조건] ‘the 비교급 ~, the 비교급 ...’ 구문을 활용할 것\n[보기] we / practice / the / better / more / become / the\n\n우리말: 더 많이 연습할수록 우리는 더 잘하게 된다.', boxTitle: '조건과 보기',
    model: 'The more we practice, the better we become.',
    rubric: ['The more ..., the better ... 구조 (3점)', '모든 단어를 사용 (1점)', '쉼표·마침표 등 형식 (1점)']
  });

  L.push({
    type: T9, pts: 5, kind: 'essay',
    stem: '우리말 해석을 보고 <보기>의 모든 단어와 조건을 활용하여 문장을 완성하시오. [5점]',
    box: '[조건] 관계대명사 that과 수동태를 사용할 것\n[보기] the book / that / I / from the library / borrowed / was written / by a famous scientist\n\n우리말: 내가 도서관에서 빌린 그 책은 한 유명한 과학자에 의해 쓰였다.', boxTitle: '조건과 보기',
    model: 'The book that I borrowed from the library was written by a famous scientist.',
    rubric: ['The book that I borrowed from the library (2점)', 'was written by a famous scientist (2점)', '모든 단어 사용·형식 (1점)']
  });

  addQ('eng', L);

  GUIDE.eng = {
    summary: '객관식 25문항(2.8~3.6점) + 서술형 4문항(각 5점). 지문이 길고 어려운 단어가 많아 어휘·어법 비중이 큽니다. 빈칸·요약문 같은 3점대 후반 문항이 합격선을 가릅니다.',
    types: [
      { name: T1, tips: '첫 문장과 마지막 문장(However, Therefore 뒤)에 주제가 있는 경우가 대부분입니다.', ex: '다음 글의 주제로 가장 적절한 것은?' },
      { name: T2, tips: '빈칸 앞뒤 문장의 연결어(However, In other words)를 단서로 쓰고, 선택지의 극단적 표현(only, always)은 의심하세요.', ex: '빈칸에 들어갈 말로 가장 적절한 것은?' },
      { name: T3, tips: '수일치, 관계사(who/whose/which), to부정사·동명사, 능동·수동, 병렬 구조를 체크리스트로 만들어 확인하세요.', ex: '밑줄 친 부분 중 어법상 적절하지 않은 것은?' },
      { name: T4, tips: '글의 전체 방향과 반대되는 단어(increase vs reduce)를 찾는 문제. 긍정/부정 흐름을 먼저 파악.', ex: '낱말의 쓰임이 적절하지 않은 것은?' },
      { name: T5, tips: '주어진 문장의 대명사·연결어(This, Similarly, As a result)가 가리키는 앞 내용을 찾으세요.', ex: '주어진 문장이 들어가기에 가장 적절한 곳은?' },
      { name: T6, tips: '선택지를 먼저 읽고 지문에서 해당 부분을 찾아 숫자·인물·시간을 대조합니다.', ex: '다음 글의 내용과 일치(불일치)하는 것은?' },
      { name: T7, tips: '요약문의 앞부분은 지문 전체의 주제, (A)(B)는 핵심 어휘의 반대 짝(share–dissatisfied)을 찾으세요.', ex: '요약문의 빈칸 (A), (B)에 들어갈 말로 가장 적절한 것은?' },
      { name: T8, tips: '앞뒤 내용이 같은 방향인지(In addition) 반대인지(However) 먼저 판단.', ex: '빈칸 (A), (B)에 들어갈 연결어' },
      { name: T9, tips: '우리말 해석을 구조(주어–동사–목적어)로 쪼개고 <조건>의 구문을 먼저 세운 뒤 보기 단어를 배열. 단어를 하나라도 빠뜨리면 감점!', ex: '조건에 맞게 <보기>의 모든 단어를 활용하여 영작' }
    ]
  };
})();
