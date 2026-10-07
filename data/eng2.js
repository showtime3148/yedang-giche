/* 공통영어 - 예상문제 2차 (모든 지문은 직접 창작, 고1 수준) */
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
  const POS = ['①', '②', '③', '④', '⑤'];
  const L = [];
  // 정답을 pos(1~5) 위치에 끼워 넣어 보기 배열 생성
  const ch = (pos, right, wrongs) => { const a = wrongs.slice(); a.splice(pos - 1, 0, right); return a; };
  const add = (type, pts, passage, stem, choices, ans, explain, extra) =>
    L.push(Object.assign({ type, pts, passage, stem, choices, ans, explain, shuffle: false }, extra || {}));
  const addPos = (type, pts, passage, stem, ans, explain, extra) =>
    add(type, pts, passage, stem, POS, ans, explain, Object.assign({ posChoices: true }, extra || {}));

  // ---- P1 봉사 프로젝트 (주제, 불일치)
  const P1 = 'Last spring, a group of high school students in our town started a small project called “Read with Me.” Every Saturday morning, they visit a local elementary school and read picture books aloud to children who are just learning to read. At first, the younger students were shy and rarely spoke. However, after a few weeks, they began to ask questions and even to read short sentences by themselves. The high school students also gained something valuable. They said that teaching others helped them become more patient and confident. One participant, Hana, explained, “I thought I was going to help the kids, but they ended up teaching me how to listen.” The project now has twenty members, and the town plans to expand it to other schools next year.';
  add(T1, 3, P1, '다음 글의 주제로 가장 적절한 것은?',
    ch(1, 'Benefits of a reading volunteer project for both students and children', ['Reasons why young children dislike reading', 'How to choose picture books for elementary school', 'Difficulties of running a school project', 'The importance of learning to listen to teachers']), 1,
    '고등학생들이 초등학생에게 책을 읽어 주는 봉사 프로젝트가 양쪽 모두에게 도움이 되었다는 내용이다.', { group: 'e2p1' });
  add(T6, 2.8, P1, '다음 글의 내용과 일치하지 않는 것은?',
    ch(5, 'The project has already been expanded to other schools.', ['The project meets on Saturday mornings.', 'The younger students were shy at first.', 'The high school students became more patient through the project.', 'The project now has twenty members.']), 5,
    '다른 학교로 확대할 계획(plans to expand)이라고 했을 뿐, 이미 확대된 것은 아니다.', { group: 'e2p1' });

  // ---- P2 습관 (빈칸, 요약, 일치)
  const P2 = 'Many people try to change their lives all at once. They promise to exercise every day, eat healthy food, and wake up early, but after a few weeks they give up. Psychologists say that this happens because big changes require a great deal of willpower, which is limited. A better approach is to start with a very small action, such as doing two push-ups after brushing your teeth. Because the action is so easy, you can do it even on a tired day. Over time, the small action becomes automatic, and you can slowly add more. In this way, success in forming new habits depends less on strong motivation than on ______________________.';
  add(T2, 3.4, P2, '다음 빈칸에 들어갈 말로 가장 적절한 것은?',
    ch(3, 'making the first step small enough to repeat every day', ['setting goals that are impossible to reach', 'waiting until you feel fully motivated', 'changing every part of your life at once', 'asking others to do the work for you']), 3,
    '아주 작은 행동으로 시작하면 피곤한 날에도 할 수 있고 점차 자동화된다는 내용이므로, 첫걸음을 매일 반복할 수 있을 만큼 작게 만드는 것이 빈칸에 알맞다.', { group: 'e2p2' });
  add(T7, 3.6, P2 + '\n\n↓\n\nTo build a new habit, it is better to start with a (A) ________ action than to attempt a (B) ________ change.',
    '위 글의 내용을 한 문장으로 요약하고자 한다. 빈칸 (A), (B)에 들어갈 말로 가장 적절한 것은?',
    ch(1, '(A) small – (B) dramatic', ['(A) difficult – (B) gradual', '(A) tiring – (B) small', '(A) automatic – (B) slight', '(A) large – (B) steady']), 1,
    '작은(small) 행동으로 시작하는 것이 한꺼번에 일어나는 극적인(dramatic) 변화를 시도하는 것보다 낫다는 내용이다.', { group: 'e2p2' });
  add(T6, 2.8, P2, '다음 글의 내용과 일치하는 것은?',
    ch(4, 'A small action can be done even when a person is tired.', ['Willpower is unlimited if a person is motivated.', 'Big changes are easier to keep than small ones.', 'Psychologists say a habit forms within one week.', 'New actions should be added all at once.']), 4,
    '행동이 아주 쉬워서 피곤한 날에도 할 수 있다고 했다. 의지력은 한정되어 있고, 행동은 천천히 추가한다.', { group: 'e2p2' });

  // ---- P3 도서관 (요지, 연결어)
  const P3 = 'Libraries used to be known as quiet places where people borrowed books. Today, however, many libraries are changing their roles. Some offer 3D printers and video-editing rooms, and others lend tools such as hammers and sewing machines. A library in Canada even lets visitors borrow fishing rods. These services are not meant to replace books. Instead, they reflect the idea that a library should be a place where people share resources and learn new skills. (A) ________, people who cannot afford expensive equipment can try new hobbies at no cost. (B) ________, the library is becoming a community center rather than just a storehouse of books.';
  add(T1, 3, P3, '다음 글의 요지로 가장 적절한 것은?',
    ch(4, 'Modern libraries are becoming community spaces that share various resources.', ['Libraries should stop lending books to the public.', 'Tools and machines are more useful than books.', 'People in Canada prefer fishing to reading.', 'Libraries must stay quiet to protect their value.']), 4,
    '도서관이 책뿐 아니라 장비와 기술까지 공유하는 지역 공동체의 중심으로 변하고 있다는 내용이다.', { group: 'e2p3' });
  add(T8, 3, P3, '다음 글의 빈칸 (A), (B)에 들어갈 말로 가장 적절한 것은?',
    ch(2, '(A) For instance – (B) In short', ['(A) However – (B) For example', '(A) In contrast – (B) Similarly', '(A) As a result – (B) In contrast', '(A) Moreover – (B) However']), 2,
    '(A) 앞의 일반적 설명에 대한 구체적 사례가 이어지므로 For instance, (B)는 앞 내용을 정리하므로 In short가 알맞다.', { group: 'e2p3' });

  // ---- P4 어법 (자전거)
  addPos(T3, 3.2, 'Bicycles have become one of the most popular ways ① to travel in many European cities. In Amsterdam, for example, there are more bicycles ② than people, and bike lanes ③ are separated from the roads for safety. The city’s leaders, ④ who wanted to reduce traffic and air pollution, started building these lanes decades ago. Thanks to their efforts, cycling is now so easy and safe that even young children ⑤ rides to school by themselves. Visitors are often surprised by how calm the streets feel. Many other cities, including Paris and Seoul, are now following this example by adding new bike lanes and rental stations. Local residents say that cycling saves them money and keeps them healthy.',
    '다음 글의 밑줄 친 부분 중, 어법상 적절하지 않은 것은?', 5,
    '주어 young children이 복수이므로 동사도 복수형이어야 한다. ⑤ rides → ride.');

  // ---- P5 어휘 (산호초)
  addPos(T4, 3, 'Coral reefs cover less than one percent of the ocean floor, but they are home to about a quarter of all marine species. Reefs ① protect coastlines from strong waves and provide food for millions of people. Unfortunately, rising sea temperatures cause corals to lose their bright colors and eventually die. Scientists are ② pleased that most reefs could disappear within decades if the warming continues. To ③ preserve these fragile ecosystems, we need to cut greenhouse gas emissions and limit the waste flowing into the sea. Some researchers are also growing young corals in laboratories and planting them on damaged reefs, hoping this will ④ support the recovery of the ocean. Such efforts ⑤ give us hope.',
    '다음 글의 밑줄 친 부분 중, 문맥상 낱말의 쓰임이 적절하지 않은 것은?', 2,
    '산호초가 수십 년 안에 사라질 수 있다는 내용이므로 과학자들은 “기뻐한다(pleased)”가 아니라 “우려한다(concerned)”가 되어야 한다.');

  // ---- P6 삽입 (새 학교)
  addPos(T5, 3.4, 'On her first day at a new school, Jisu felt nervous. ① She did not know anyone, and the hallways seemed endless. The school was much bigger than her old one, and everyone else seemed to have friends already. ② During lunch, she sat alone at the end of a long table, staring at her tray, which she had hardly touched. ③ She said yes right away, and they began to talk. ④ They soon found that they liked the same band. ⑤ By the time the bell rang, Jisu was already looking forward to the next day. Jisu wrote about her new friend in her diary that night, hoping tomorrow would be as good.',
    '글의 흐름으로 보아, 주어진 문장이 들어가기에 가장 적절한 곳은?', 3,
    '주어진 문장(한 소녀가 함께 앉아도 되냐고 물음)이 있어야 ③의 “She said yes right away”(그녀가 바로 승낙함)가 자연스럽게 이어진다.',
    { box: 'Just then, a girl with a blue backpack walked over and asked if she could sit with her.', boxTitle: '주어진 문장' });

  // ---- P7 삽입 (조수)
  addPos(T5, 3.4, 'The ocean tides rise and fall twice a day, and the main cause is the Moon. ① The Moon’s gravity pulls on Earth’s water. ② A second bulge forms on the opposite side of Earth, because the water there is pulled less strongly than the Earth itself. ③ As Earth rotates, a coastal area passes through both bulges each day. ④ This is why most beaches experience two high tides and two low tides. ⑤ Fishermen and sailors have long used tide tables to plan their work. The Sun also affects the tides, but because it is much farther away, its influence is only about half as strong as the Moon’s.',
    '글의 흐름으로 보아, 주어진 문장이 들어가기에 가장 적절한 곳은?', 2,
    '②의 “A second bulge(두 번째 불룩한 부분)”가 나오려면 그 앞에 첫 번째 불룩한 부분이 먼저 언급되어야 한다.',
    { box: 'This pull is strongest on the side facing the Moon, so the water there rises into a bulge.', boxTitle: '주어진 문장' });

  // ---- P8 어법 (김치)
  addPos(T3, 3.2, 'Kimchi, a traditional Korean food, ① is made by fermenting vegetables with salt and spices. Many families add garlic, ginger, and red pepper powder, and each region has its own recipe. During fermentation, helpful bacteria ② grow and give kimchi its sour taste. Scientists have found that eating kimchi may help ③ improving digestion and strengthen the immune system. Because kimchi can ④ be stored for months, families have long prepared large amounts of it in late autumn. This custom, ⑤ called gimjang, is now recognized as an important cultural heritage. Today, kimchi is exported to dozens of countries, and chefs around the world use it in new dishes such as pizza and tacos.',
    '다음 글의 밑줄 친 부분 중, 어법상 적절하지 않은 것은?', 3,
    'help는 동사원형 또는 to부정사를 목적어(보어)로 취하며 and 뒤의 strengthen과 병렬을 이룬다. ③ improving → improve.');

  // ---- P9 어휘 (꿀벌)
  addPos(T4, 3, 'Honeybees ① communicate with each other through a special movement called the waggle dance. When a worker bee finds a good source of flowers, she returns to the hive and dances in a figure-eight pattern. The angle of the dance shows the ② direction of the flowers relative to the sun, and the length of the dance tells the ③ distance. Other bees watch carefully and then fly straight to the place. This happens inside a dark hive, so the bees follow the dancer by touch and sound. Scientists were ④ amazed to discover that such small insects can share such complex information. Without this system, the colony would ⑤ gather food much more efficiently.',
    '다음 글의 밑줄 친 부분 중, 문맥상 낱말의 쓰임이 적절하지 않은 것은?', 5,
    '이 춤이 없다면 꿀벌 무리는 먹이를 “훨씬 더 비효율적으로” 모을 것이므로 ⑤ gather ... more efficiently는 문맥에 맞지 않는다(less efficiently가 되어야 함).');

  // ---- P10 빵집 (빈칸, 요지, 일치)
  const P10 = 'A famous baker once told a group of young students about his early failures. He had loved bread since childhood, but his first loaves were usually thrown away. In his first year, almost every loaf he made came out too flat or too hard. He wanted to quit, but his teacher showed him how each failed loaf contained a clue: too much yeast, not enough time, or an oven that was too hot. By writing down these clues and trying again, he improved a little each week. “I did not become a good baker because I never failed,” he told the students. “I became a good baker because I ______________________.”';
  add(T2, 3.4, P10, '다음 빈칸에 들어갈 말로 가장 적절한 것은?',
    ch(2, 'learned from every mistake I made', ['bought a bigger and better oven', 'avoided difficult recipes', 'followed my teacher without thinking', 'gave up and tried a different job']), 2,
    '실패한 빵마다 단서가 있었고 그것을 기록하며 개선했다는 내용이므로 “모든 실수에서 배웠기 때문”이 알맞다.', { group: 'e2p10' });
  add(T1, 3, P10, '다음 글의 요지로 가장 적절한 것은?',
    ch(1, 'Mistakes can be valuable chances to learn and improve.', ['Good bakers never make a single mistake.', 'Teachers should decide what students bake.', 'An expensive oven guarantees tasty bread.', 'Quitting early is the wisest choice.']), 1,
    '실패에서 단서를 찾아 배우며 성장했다는 이야기이다.', { group: 'e2p10' });
  add(T6, 2.8, P10, '다음 글의 내용과 일치하는 것은?',
    ch(5, 'He wrote down the clues from his failed loaves.', ['He succeeded from the very first year.', 'His teacher told him to quit baking.', 'He bought a new oven to solve the problem.', 'He told the students that he had never failed.']), 5,
    '실패한 빵에서 얻은 단서를 적어 두고 다시 시도했다고 했다.', { group: 'e2p10' });

  // ---- P11 소음 (요약, 일치)
  const P11 = 'Noise is more than an annoyance. Studies of people living near busy airports show that constant loud sounds raise stress levels and make it harder for the body to rest, even during sleep. Children who attend schools under flight paths often score lower on reading tests than those in quieter areas. Researchers believe that noise forces the brain to keep reacting to sound, which uses up energy that could be spent on thinking and learning. Some cities have responded by building walls along highways and planting trees to absorb sound. Such efforts suggest that a quieter environment is not a luxury but a basic condition for healthy living.';
  add(T7, 3.6, P11 + '\n\n↓\n\nContinuous (A) ________ harms both physical and mental health, so cities are trying to (B) ________ it.',
    '위 글의 내용을 한 문장으로 요약하고자 한다. 빈칸 (A), (B)에 들어갈 말로 가장 적절한 것은?',
    ch(4, '(A) noise – (B) reduce', ['(A) silence – (B) increase', '(A) music – (B) reduce', '(A) noise – (B) ignore', '(A) stress – (B) create']), 4,
    '지속적인 소음(noise)이 건강을 해치며, 도시들은 방음벽과 나무로 소음을 줄이려(reduce) 한다.', { group: 'e2p11' });
  add(T6, 2.8, P11, '다음 글의 내용과 일치하는 것은?',
    ch(2, 'Children under flight paths often score lower on reading tests.', ['Noise affects only our hearing.', 'Cities have refused to take any action.', 'Trees along highways increase the noise.', 'Noise helps the brain save energy.']), 2,
    '비행 경로 아래 학교의 아이들은 읽기 시험 점수가 더 낮은 경우가 많다고 했다.', { group: 'e2p11' });

  // ---- P12 전기차 (연결어, 불일치)
  const P12 = 'Electric cars are often described as the cleaner choice because they do not produce exhaust gas. (A) ________, producing their batteries requires a large amount of energy and mining. This means an electric car starts its life with a bigger environmental cost than a gasoline car. (B) ________, over many years of driving, the electric car makes up for this difference, especially when the electricity comes from solar or wind power. Therefore, how green an electric car really is depends on how long it is used and how its electricity is made. Some countries are therefore investing in recycling programs that recover valuable metals from old batteries.';
  add(T8, 3, P12, '다음 글의 빈칸 (A), (B)에 들어갈 말로 가장 적절한 것은?',
    ch(3, '(A) However – (B) Still', ['(A) In addition – (B) As a result', '(A) For example – (B) Similarly', '(A) Therefore – (B) In contrast', '(A) Moreover – (B) For instance']), 3,
    '(A) 배기가스가 없다는 앞 내용과 배터리 생산에 에너지가 든다는 내용이 상반되므로 However, (B) 환경 비용이 더 크다는 말과 장기적으로 만회된다는 말이 대조되므로 Still이 알맞다.', { group: 'e2p12' });
  add(T6, 2.8, P12, '다음 글의 내용과 일치하지 않는 것은?',
    ch(4, 'The difference in environmental cost never disappears, even after many years.', ['Electric cars do not produce exhaust gas.', 'Making batteries requires a lot of energy.', 'An electric car begins with a larger environmental cost.', 'How green an electric car is depends on how its electricity is made.']), 4,
    '오랜 기간 운행하면 그 차이를 만회한다고 했으므로 차이가 영영 사라지지 않는다는 ④는 일치하지 않는다.', { group: 'e2p12' });

  // ---- P13 어법 (만리장성)
  addPos(T3, 3.2, 'The Great Wall of China, ① what stretches for thousands of kilometers, was not built all at once. Different dynasties added new sections over about two thousand years. The first walls were built to protect the northern border from invaders, and later rulers repaired and extended them. Many parts ② were made of stone and brick, but some sections in the desert ③ were built from packed earth. Along the wall, watchtowers were built every few hundred meters so that soldiers could send smoke signals over long distances. Today, tourists from around the world ④ visit the wall, and efforts to protect it ⑤ are ongoing. Visitors say the view from the top is unforgettable.',
    '다음 글의 밑줄 친 부분 중, 어법상 적절하지 않은 것은?', 1,
    '선행사 The Great Wall of China를 수식하며 쉼표 뒤에서 주어 역할을 하는 계속적 용법의 관계대명사는 which이다. what은 선행사를 가질 수 없다. ① what → which.');

  // ---- P14 어휘 (스마트폰)
  addPos(T4, 3, 'Smartphones have made our lives more convenient, but they also ① improve our ability to focus. Each notification pulls our attention away from what we are doing, and it can take several minutes to ② return to full concentration. In one experiment, students who kept their phones on the desk scored lower on a memory test than students who left them in another room. The researchers concluded that even the ③ presence of a phone uses part of our mental energy. To protect our concentration, experts ④ advise turning off unnecessary alerts and keeping the phone out of sight while studying. These small habits may ⑤ strengthen our focus more than we expect.',
    '다음 글의 밑줄 친 부분 중, 문맥상 낱말의 쓰임이 적절하지 않은 것은?', 1,
    '알림이 주의를 빼앗는다는 내용이므로 집중력을 “향상시킨다(improve)”가 아니라 “해친다(damage/reduce)”가 되어야 한다.');

  // ---- P15 삽입 (종이 재활용)
  addPos(T5, 3.4, 'Recycling paper takes several steps. It is one of the most common forms of recycling in the world, and many people take part in it every week. ① First, used paper is collected and sorted by type. ② Next, it is mixed with water and broken down into a soft pulp. ③ Special chemicals are then used to remove the ink from the pulp. ④ Finally, the cleaned sheets are cut to size and sent to stores. ⑤ Paper made this way uses far less energy than paper made from fresh trees. Many schools now have special bins for this purpose, and choosing recycled paper for notebooks is a simple way for students to protect forests.',
    '글의 흐름으로 보아, 주어진 문장이 들어가기에 가장 적절한 곳은?', 4,
    '“Once the ink is gone(잉크가 제거되면)”은 ③의 잉크 제거 단계 직후에 와야 하며, 이어서 완성된 종이를 자르는 마지막(Finally) 단계가 나온다.',
    { box: 'Once the ink is gone, the pulp is pressed flat and dried into new sheets.', boxTitle: '주어진 문장' });

  // ---- P16 소리 내어 읽기 (주제, 빈칸, 일치)
  const P16 = 'Reading aloud is not only for young children. When we read a text out loud, we use our eyes, our mouth, and our ears at the same time. This extra effort helps the brain remember the words better than silent reading does. Teachers also say that reading aloud can reveal sentences that sound awkward, which makes it a useful tool for improving our own writing. Many famous writers read their drafts aloud before sending them to publishers. For language learners, the practice is especially helpful because it trains pronunciation and rhythm. In short, reading aloud is a simple method that improves ______________________.';
  add(T1, 3, P16, '다음 글의 주제로 가장 적절한 것은?',
    ch(1, 'Reading aloud as a simple way to learn and write better', ['Why famous writers avoid publishers', 'The risks of reading silently', 'How to teach young children to speak', 'Ways to choose a good drafting tool']), 1,
    '소리 내어 읽기가 기억, 글쓰기, 발음 등을 향상시키는 간단한 방법이라는 내용이다.', { group: 'e2p16' });
  add(T2, 3.4, P16, '다음 빈칸에 들어갈 말로 가장 적절한 것은?',
    ch(5, 'both our memory and our expression', ['our ability to solve math problems', 'the speed of our typing', 'only the writing of professional authors', 'how quickly we fall asleep']), 5,
    '소리 내어 읽으면 단어를 더 잘 기억하고(memory), 어색한 문장을 찾아 글쓰기와 발음·리듬(expression)을 개선한다.', { group: 'e2p16' });
  add(T6, 2.8, P16, '다음 글의 내용과 일치하는 것은?',
    ch(3, 'Many famous writers read their drafts aloud before publishing.', ['Reading aloud uses only the mouth.', 'Silent reading helps memory more than reading aloud.', 'Reading aloud is useful only for young children.', 'Reading aloud is harmful to pronunciation.']), 3,
    '많은 유명 작가들이 출판사에 보내기 전에 초고를 소리 내어 읽는다고 했다.', { group: 'e2p16' });

  // ---- P17 음식물 쓰레기 (요약, 요지)
  const P17 = 'About one third of all food produced in the world is never eaten. Some of it is lost on farms and during transport, but a surprising amount is thrown away in homes. People often buy more than they need, misunderstand “best before” dates, and throw away food that is still safe to eat. Wasted food also means wasted water, land, and energy used to grow it, and rotting food in landfills releases a gas that warms the planet. Simple actions, such as planning meals, storing food properly, and using leftovers, can reduce waste dramatically. In many countries, schools and restaurants are also starting programs to share unused food with people in need.';
  add(T7, 3.6, P17 + '\n\n↓\n\nBecause much of the food produced is (A) ________ in households, we can help the planet by (B) ________ our food more carefully.',
    '위 글의 내용을 한 문장으로 요약하고자 한다. 빈칸 (A), (B)에 들어갈 말로 가장 적절한 것은?',
    ch(2, '(A) wasted – (B) managing', ['(A) shared – (B) wasting', '(A) stored – (B) buying', '(A) eaten – (B) throwing', '(A) lost – (B) ignoring']), 2,
    '가정에서 많은 음식이 버려지므로(wasted), 음식을 더 신중하게 관리하면(managing) 환경에 도움이 된다.', { group: 'e2p17' });
  add(T1, 3, P17, '다음 글의 요지로 가장 적절한 것은?',
    ch(3, 'Simple habits at home can reduce food waste and help the planet.', ['Food prices will keep rising every year.', 'Farms are the only place where food is lost.', '“Best before” dates should be ignored completely.', 'Landfills are the best way to handle leftovers.']), 3,
    '식사 계획, 보관, 남은 음식 활용 같은 간단한 습관이 음식물 쓰레기를 줄이고 환경에 도움이 된다.', { group: 'e2p17' });

  // ---- P18 어법 (할아버지와 낚시)
  addPos(T3, 3.2, 'When I was young, my grandfather ① taught me how to fish. He was a quiet man who had spent his whole life by the water. Every Sunday morning, we would wake up early and walk to the river ② carried a small box of bait. He never talked much, but I learned a lot ③ by watching him. Now that I am older, I understand that those quiet hours ④ were really lessons about patience. I still go fishing, and ⑤ whenever I sit by the river, I think of him. Last year, I took my own daughter there, and I taught her the same lessons he once taught me. The river has hardly changed since those days.',
    '다음 글의 밑줄 친 부분 중, 어법상 적절하지 않은 것은?', 2,
    '“우리는 ~을 들고 강으로 걸어갔다”는 동시동작의 분사구문이므로 현재분사가 알맞다. ② carried → carrying.');

  // ---- P19 학교 축제 안내 (일치, 알 수 없는 것)
  const P19 = 'This year’s school festival will be held on Friday, October 23, in the gym and on the playground. The program begins at 10 a.m. with a student band performance, followed by food booths run by each class. Visitors can also try science experiments in Room 205 and see the art exhibition in the library. Parking is not available at school, so families are asked to use public transportation. Tickets are not needed, but visitors should sign in at the front desk. The festival ends at 4 p.m. with a prize ceremony for the best class booth. Everyone is welcome, and we hope to see many families there.';
  add(T6, 2.8, P19, '다음 안내문의 내용과 일치하는 것은?',
    ch(2, 'The festival begins with a student band performance.', ['The festival is held only in the gym.', 'Parking is available at school.', 'Visitors must buy tickets in advance.', 'The festival ends at noon.']), 2,
    '오전 10시에 학생 밴드 공연으로 시작한다고 했다. 장소는 체육관과 운동장, 주차는 불가, 입장권은 불필요, 종료는 오후 4시이다.', { group: 'e2p19' });
  add(T6, 2.8, P19, '다음 안내문을 읽고 알 수 없는 것은?',
    ch(3, '축제에 참여하는 학급의 수', ['축제 시작 시간', '과학 실험 체험 장소', '입장권 필요 여부', '축제 종료 시각']), 3,
    '참여 학급의 수는 글에 나오지 않는다. 시작(10시), 과학 실험(205호), 입장권(불필요), 종료(4시)는 모두 언급되었다.', { group: 'e2p19' });

  // ---- P20 자기통제 (빈칸, 요지)
  const P20 = 'Imagine you are offered one cookie now or two cookies if you wait fifteen minutes. Researchers have used this kind of choice to study self-control in children. In these tests, researchers watched each child through a window. Those who waited tended to do better in school years later, but the reason may not be simple willpower. The children who waited often used clever tricks, such as looking away from the cookie or singing a song to distract themselves. This suggests that self-control can be learned like any other skill. Therefore, rather than a quality we are simply born with, self-control is ______________________.';
  add(T2, 3.4, P20, '다음 빈칸에 들어갈 말로 가장 적절한 것은?',
    ch(4, 'a skill that can be developed through practice', ['a talent that never changes', 'a feeling that appears only in children', 'something that has nothing to do with school', 'a habit of eating less sugar']), 4,
    '기다린 아이들이 요령(전략)을 썼다는 점에서 자기통제도 다른 기술처럼 배울 수 있다는 결론이 나온다.', { group: 'e2p20' });
  add(T1, 3, P20, '다음 글의 요지로 가장 적절한 것은?',
    ch(2, 'Self-control can be improved by learning useful strategies.', ['Children should never be offered sweets.', 'Willpower is the only cause of success in school.', 'Waiting fifteen minutes is always a bad idea.', 'Singing is the best way to study.']), 2,
    '자기통제는 타고나는 것이 아니라 전략을 통해 배우고 키울 수 있다는 내용이다.', { group: 'e2p20' });

  // ---- P21 어휘 (치타)
  addPos(T4, 3, 'The cheetah is the fastest land animal, able to reach speeds of over one hundred kilometers per hour in just a few seconds. Its long legs, flexible spine, and large lungs all ① contribute to this remarkable speed. However, a cheetah can keep running at full speed for only about thirty seconds. After a chase, it must rest for a long time because its body temperature ② rises quickly. Surprisingly, cheetahs fail in nearly half of their hunts, and larger animals such as lions often steal their food. As a result, these elegant hunters are always in ③ safety, and their numbers in the wild are decreasing. People can help by ④ protecting the grasslands where they live and by supporting groups that ⑤ monitor their populations.',
    '다음 글의 밑줄 친 부분 중, 문맥상 낱말의 쓰임이 적절하지 않은 것은?', 3,
    '사냥에 자주 실패하고 먹이를 빼앗기며 개체 수가 줄고 있다는 내용이므로 “안전한(safety)”이 아니라 “위험에 처한(in danger)”이 되어야 한다.');

  // ---- P22 어법 (진로)
  addPos(T3, 3.2, 'Choosing a career is one of the most important decisions in life, yet many teenagers feel ① unprepared for it. Because there are thousands of jobs, it is natural to feel confused. Experts suggest that students ② try different activities, such as clubs and part-time jobs, to discover what they enjoy. It is also helpful to talk with adults ③ whose work seems interesting. Remember that your first choice does not ④ has to be permanent. Many people change their careers several times, and ⑤ what they learn along the way becomes valuable experience. Some jobs that exist today did not even exist twenty years ago.',
    '다음 글의 밑줄 친 부분 중, 어법상 적절하지 않은 것은?', 4,
    '조동사 do의 부정형 does not 뒤에는 동사원형이 오므로 does not have to가 되어야 한다. ④ has → have.');

  // ---- P23 삽입 (학교 텃밭)
  addPos(T5, 3.4, 'Our school started a small garden last year. It was only a few wooden boxes behind the gym, but we were proud of it. ① At first, only a few students joined, and most of the seeds died because nobody watered them regularly. ② The science teacher then created a watering schedule, and each class took responsibility for one day of the week. ③ Soon the plants began to grow, and the students were thrilled to see tomatoes and peppers. ④ In autumn, they harvested enough vegetables to share with the school cafeteria. ⑤ Next spring, they plan to double the size of the garden. The cafeteria staff even created a special salad menu using the vegetables.',
    '글의 흐름으로 보아, 주어진 문장이 들어가기에 가장 적절한 곳은?', 5,
    '“Looking back on the whole year(한 해를 돌아보며)”는 한 해의 활동(시작~수확)을 모두 서술한 뒤에 와야 하므로 ⑤가 적절하다. 이후 내년 계획으로 자연스럽게 이어진다.',
    { box: 'Looking back on the whole year, they saw that even a small project needs patience and cooperation.', boxTitle: '주어진 문장' });

  // ---- P24 온라인 수업 (연결어, 불일치)
  const P24 = 'Online classes have become common in many schools. Since the pandemic, they have become even more popular. (A) ________, they allow students to learn from anywhere, which is especially helpful for those who live far from school. Recorded lessons can also be watched repeatedly, so students can review difficult parts at their own speed. (B) ________, online learning has some disadvantages. Students may feel lonely without classmates, and it is easy to lose focus at home. For this reason, many schools now combine online and in-person lessons to take advantage of both. Teachers say that choosing the right mix for each subject is the key to success.';
  add(T8, 3, P24, '다음 글의 빈칸 (A), (B)에 들어갈 말로 가장 적절한 것은?',
    ch(4, '(A) On the one hand – (B) On the other hand', ['(A) However – (B) Therefore', '(A) In addition – (B) For instance', '(A) As a result – (B) Similarly', '(A) For example – (B) In other words']), 4,
    '온라인 수업의 장점을 먼저 말하고(On the one hand) 이어 단점을 소개하는(On the other hand) 흐름이다.', { group: 'e2p24' });
  add(T6, 2.8, P24, '다음 글의 내용과 일치하지 않는 것은?',
    ch(5, 'Online learning has no disadvantages.', ['Online classes let students learn from anywhere.', 'Recorded lessons can be watched many times.', 'Students may lose focus at home.', 'Many schools combine online and in-person lessons.']), 5,
    '온라인 학습에는 외로움, 집중력 저하 등의 단점이 있다고 했다.', { group: 'e2p24' });

  // ---- P25 과잉 관광 (요약, 요지)
  const P25 = 'Overtourism has become a serious problem in popular travel destinations. In Venice, for example, residents are outnumbered by visitors on busy days, and local shops are being replaced by souvenir stands. Rising rents force families to leave, and the city’s unique community slowly disappears. To address this, some cities have begun limiting the number of visitors, charging entry fees, or encouraging tourists to visit during quieter seasons. These measures do not aim to keep travelers away; rather, they try to protect the places that make travel worth the trip. Local governments say that finding the right balance will take time, but doing nothing is no longer possible.';
  add(T7, 3.6, P25 + '\n\n↓\n\nToo many (A) ________ can damage the local life of a destination, so cities are trying to (B) ________ their number.',
    '위 글의 내용을 한 문장으로 요약하고자 한다. 빈칸 (A), (B)에 들어갈 말로 가장 적절한 것은?',
    ch(5, '(A) tourists – (B) limit', ['(A) shops – (B) raise', '(A) residents – (B) reduce', '(A) hotels – (B) welcome', '(A) events – (B) hide']), 5,
    '지나치게 많은 관광객(tourists)이 지역 생활을 해치므로 도시들은 방문객 수를 제한(limit)하려 한다.', { group: 'e2p25' });
  add(T1, 3, P25, '다음 글의 요지로 가장 적절한 것은?',
    ch(3, 'Managing the number of tourists is necessary to protect local communities and attractions.', ['Souvenir stands make cities more attractive to residents.', 'Travelers should stop visiting famous cities forever.', 'Entry fees are the only way to attract more visitors.', 'Rising rents help families settle in popular cities.']), 3,
    '과잉 관광으로 지역 공동체가 위협받으므로 방문객 수를 관리해 장소를 보호해야 한다는 내용이다.', { group: 'e2p25' });

  // ---- P26 개미 (빈칸, 일치)
  const P26 = 'Ants are small, but together they can accomplish remarkable things. Some ants can carry objects far heavier than their own bodies, and some colonies contain millions of members. Scientists have studied this behavior for many years. In a colony, no single ant is in charge, yet the group builds complex nests, finds food, and defends itself against enemies. Each ant follows simple rules, such as leaving a scent trail to food that other ants can follow. When many ants follow and strengthen the same trail, the shortest route to the food becomes the strongest. No ant plans this; the solution comes from many small actions combined. Ant colonies show that ______________________.';
  add(T2, 3.4, P26, '다음 빈칸에 들어갈 말로 가장 적절한 것은?',
    ch(1, 'simple individual actions can lead to intelligent group results', ['large groups cannot solve problems without a leader', 'ants should be kept away from food', 'small animals are always weaker than large ones', 'scent trails are harmful to colonies']), 1,
    '지휘하는 개미가 없어도 단순한 행동들이 모여 최단 경로 같은 지능적 결과를 만든다는 내용이다.', { group: 'e2p26' });
  add(T6, 2.8, P26, '다음 글의 내용과 일치하는 것은?',
    ch(5, 'Ants leave scent trails that other ants can follow.', ['A leader ant gives orders to the whole colony.', 'Each ant plans the shortest route by itself.', 'Ant colonies cannot defend themselves.', 'Ants work alone to build their nests.']), 5,
    '개미는 다른 개미가 따라갈 수 있는 냄새 길을 남긴다고 했다.', { group: 'e2p26' });

  // ---- P27 어법 (피라미드)
  addPos(T3, 3.2, 'Thousands of years ago, people in Egypt ① build the pyramids as tombs for their kings. It took thousands of workers many years to finish a single pyramid. The stones, ② weighing several tons each, were moved on wooden sledges across the sand. Workers poured water in front of the sledges, ③ which made the sand firmer and the sledges easier to pull. The ropes used to pull them were made from plants that grew along the Nile River. Scientists ④ recently confirmed this method by testing it in a laboratory. ⑤ Amazing as it sounds, the pyramids still stand today. Visitors from every continent still travel to Egypt to admire them.',
    '다음 글의 밑줄 친 부분 중, 어법상 적절하지 않은 것은?', 1,
    '“Thousands of years ago”는 명백한 과거를 나타내므로 과거형이 필요하다. ① build → built.');

  // ---- P28 어휘 (시간 관리)
  addPos(T4, 3, 'Many students complain that they never have enough time, but the real problem is often not the amount of time but how it is used. Successful students usually ① prioritize their tasks, doing the most important ones first. They also ② avoid putting off work until the last minute, because rushing leads to careless mistakes. Making a weekly plan helps them see how much time they spend on each activity. Surprisingly, taking short breaks can ③ improve efficiency, since a rested mind works faster. Of course, being busy all the time does not guarantee ④ failure, and students who ignore rest often feel exhausted. A balanced schedule that leaves room for sleep and hobbies helps them ⑤ maintain energy.',
    '다음 글의 밑줄 친 부분 중, 문맥상 낱말의 쓰임이 적절하지 않은 것은?', 4,
    '“계속 바쁘다고 해서 ~이 보장되는 것은 아니다”라는 흐름이므로 failure가 아니라 success가 되어야 한다.');

  // ---- P29 삽입 (세탁기)
  addPos(T5, 3.4, '① Cooking, cleaning, and carrying water all demanded hard physical effort. Families often needed every member, including children, to help finish the daily chores before dark. ② Washing clothes alone could take an entire day, since people scrubbed each piece by hand. Hot water had to be heated over a fire, and the wet clothes were so heavy that they were hard to lift. ③ Then the washing machine arrived, and the same task took only a few hours. ④ People suddenly had free time to study, work, or rest. ⑤ Similar machines, such as dishwashers and vacuum cleaners, soon followed. Historians say that these inventions changed not only homes but also the role of women in society.',
    '글의 흐름으로 보아, 주어진 문장이 들어가기에 가장 적절한 곳은?', 1,
    '주어진 문장은 글 전체의 배경(과거의 집안일)을 제시하는 도입 문장이며, ①의 요리·청소 등 구체적 예가 그 뒤에 이어진다. 이후 세탁기 등장(Then)으로 흐름이 전개된다.',
    { box: 'In the past, housework took up most of a family’s day.', boxTitle: '주어진 문장' });

  // ---- 서술형
  const ESS = '조건에 맞게 <보기>의 모든 단어를 활용하여 문장을 완성하시오. [5점]';
  L.push({
    type: T9, pts: 5, kind: 'essay', stem: ESS,
    box: '[조건] 가정법 과거(If + 주어 + were ~, 주어 + would ~)를 사용할 것\n[보기] I / you / were / would / accept / the offer / if\n\n우리말: 내가 너라면 그 제안을 받아들일 텐데.', boxTitle: '조건과 보기',
    model: 'If I were you, I would accept the offer.',
    rubric: ['If I were you 가정법 과거 구조 (2점)', 'I would accept the offer (2점)', '모든 단어 사용·쉼표·대소문자 (1점)']
  });
  L.push({
    type: T9, pts: 5, kind: 'essay', stem: ESS,
    box: '[조건] ‘too ~ to ...’ 구문을 사용할 것\n[보기] the bag / was / too / heavy / for me / to carry\n\n우리말: 그 가방은 너무 무거워서 내가 들 수 없었다.', boxTitle: '조건과 보기',
    model: 'The bag was too heavy for me to carry.',
    rubric: ['too heavy ... to carry 구문 (3점)', 'for me (의미상 주어) 위치 (1점)', '모든 단어 사용·형식 (1점)']
  });
  L.push({
    type: T9, pts: 5, kind: 'essay', stem: ESS,
    box: '[조건] 현재완료와 since를 사용할 것\n[보기] we / each other / have / known / since / 2020\n\n우리말: 우리는 2020년 이후로 서로 알고 지내 왔다.', boxTitle: '조건과 보기',
    model: 'We have known each other since 2020.',
    rubric: ['have known 현재완료 (2점)', 'each other, since 2020 배열 (2점)', '모든 단어 사용·형식 (1점)']
  });
  L.push({
    type: T3, pts: 5, kind: 'essay',
    stem: '다음 세 문장에는 각각 어법상 틀린 부분이 한 군데씩 있다. 틀린 부분을 찾아 올바르게 고쳐 쓰시오. [5점]',
    box: '(1) The man who live next door is a doctor.\n(2) I am looking forward to see you soon.\n(3) She suggested to go hiking this weekend.', boxTitle: '문장',
    model: '(1) live → lives  (2) see → seeing  (3) to go → going',
    rubric: ['(1) 주어-동사 수일치: live → lives (2점)', '(2) look forward to + 동명사: see → seeing (1.5점)', '(3) suggest + 동명사: to go → going (1.5점)']
  });
  L.push({
    type: T7, pts: 5, kind: 'essay',
    stem: '다음 글의 내용을 요약한 문장의 빈칸 (A), (B)에 알맞은 단어를 본문에서 찾아 쓰시오. [5점]',
    passage: 'Many people believe that talent decides success. However, studies of top musicians show that the best performers practiced much longer than others, often for thousands of hours. What made the difference was not only the amount of practice but also the way they practiced. They focused on their weakest points, asked teachers for feedback, and repeated difficult parts until they were perfect. In other words, effort that is planned and focused matters more than natural ability.',
    box: 'Success depends more on (A) ________ practice than on natural (B) ________.', boxTitle: '요약문',
    model: '(A) focused (또는 planned)  (B) ability',
    rubric: ['(A) focused 또는 planned (2.5점)', '(B) ability (2.5점)']
  });

  addQ('eng', L);
})();
