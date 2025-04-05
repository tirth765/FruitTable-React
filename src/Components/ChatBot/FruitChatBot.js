import React, { useState, useRef, useEffect } from 'react';
import { IoSend } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';
import { FaRobot, FaAppleAlt } from 'react-icons/fa';
import './FruitChatBot.css';

const FruitChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', text: 'Hello! I\'m your Fruit AI assistant. I can provide information about a wide variety of fruits including their nutrition, health benefits, varieties, storage tips, origins, seasonality, and culinary uses. Ask me anything about fruits!' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const messageEndRef = useRef(null);
  
  // Fruit knowledge base
  const fruitKnowledge = {
    apple: {
      nutrition: 'Apples are rich in fiber, vitamin C, and various antioxidants.',
      benefits: 'They may help reduce the risk of heart disease, cancer, and diabetes.',
      varieties: 'Popular varieties include Gala, Honeycrisp, Granny Smith, and Fuji.',
      storage: 'Store apples in the refrigerator to maintain freshness for up to 4-6 weeks.',
      origin: 'Apples originated in Central Asia, likely in Kazakhstan.',
      season: 'Peak season is late summer through fall (August to November).',
      culinary: 'Used in pies, sauces, juices, salads, and eaten raw. Also fermented into cider.'
    },
    banana: {
      nutrition: 'Bananas are high in potassium, vitamin B6, vitamin C, and fiber.',
      benefits: 'They support heart health, aid digestion, and can help with weight management.',
      varieties: 'Common varieties include Cavendish, Lady Finger, Red, and Plantains.',
      storage: 'Store at room temperature. Refrigerating causes the skin to darken but doesn\'t affect the fruit.',
      origin: 'Bananas originated in Southeast Asia, particularly in Malaysia, Indonesia, and the Philippines.',
      season: 'Available year-round but peak from January to April in many regions.',
      culinary: 'Eaten raw, in smoothies, in baking, fried (plantains), and used in many desserts.'
    },
    orange: {
      nutrition: 'Oranges are packed with vitamin C, fiber, folate, and potassium.',
      benefits: 'They boost immunity, improve skin health, and may reduce the risk of kidney stones.',
      varieties: 'Popular types include Valencia, Navel, Blood, and Mandarin oranges.',
      storage: 'Store at room temperature for up to a week or in the refrigerator for up to two weeks.',
      origin: 'Oranges originated in ancient China and Southeast Asia.',
      season: 'Peak season varies by region but typically winter to early spring (December to March).',
      culinary: 'Eaten fresh, juiced, used in salads, desserts, marinades, and zest used for flavoring.'
    },
    strawberry: {
      nutrition: 'Strawberries are rich in vitamin C, manganese, folate, and antioxidants.',
      benefits: 'They may improve heart health, blood sugar control, and have anti-cancer properties.',
      varieties: 'Common varieties include Albion, Chandler, Earliglow, and Honeoye.',
      storage: 'Store unwashed in the refrigerator for 3-5 days. Wash just before eating.',
      origin: 'The modern garden strawberry originated in France in the 18th century.',
      season: 'Spring to early summer (April to June) in most regions.',
      culinary: 'Eaten fresh, in desserts, jams, preserves, smoothies, and salads.'
    },
    mango: {
      nutrition: 'Mangoes contain vitamin A, vitamin C, and various antioxidants.',
      benefits: 'They support eye health, immunity, and may have anti-cancer properties.',
      varieties: 'Popular varieties include Alphonso, Ataulfo, Kent, and Tommy Atkins.',
      storage: 'Ripen at room temperature, then store in the refrigerator for up to 5 days.',
      origin: 'Mangoes originated in South Asia, specifically India, over 4,000 years ago.',
      season: 'Peak season is May to September in many regions.',
      culinary: 'Eaten fresh, in smoothies, chutneys, salsas, curries, and desserts.'
    },
    grapes: {
      nutrition: 'Grapes contain vitamins C and K, and various antioxidants like resveratrol.',
      benefits: 'They may support heart health, brain function, and have anti-inflammatory effects.',
      varieties: 'Common varieties include Thompson Seedless, Concord, Red Globe, and Champagne.',
      storage: 'Store unwashed in the refrigerator for up to a week. Wash just before eating.',
      origin: 'Grape cultivation began in the Middle East and Mediterranean regions over 8,000 years ago.',
      season: 'Late summer to early fall (August to October) in most regions.',
      culinary: 'Eaten fresh, dried as raisins, in jams, jellies, juices, and wines.'
    },
    pineapple: {
      nutrition: 'Pineapples are rich in vitamin C, manganese, and the enzyme bromelain.',
      benefits: 'They aid digestion, reduce inflammation, and boost immunity.',
      varieties: 'Common varieties include Smooth Cayenne, Queen, Red Spanish, and Abacaxi.',
      storage: 'Store whole pineapples at room temperature for 1-2 days or in the refrigerator for 3-5 days.',
      origin: 'Pineapples originated in South America, likely between Brazil and Paraguay.',
      season: 'Peak season is March to July in most regions.',
      culinary: 'Eaten fresh, grilled, in smoothies, desserts, and savory dishes like pizza and stir-fries.'
    },
    watermelon: {
      nutrition: 'Watermelons are high in water content, vitamin C, vitamin A, and lycopene.',
      benefits: 'They promote hydration, may reduce inflammation, and support heart health.',
      varieties: 'Popular varieties include Crimson Sweet, Sugar Baby, Yellow Crimson, and Seedless.',
      storage: 'Store whole watermelons at room temperature for up to a week or cut watermelon in the refrigerator for 3-4 days.',
      origin: 'Watermelons originated in Africa, particularly in the Kalahari Desert region.',
      season: 'Summer (June to August) in most regions.',
      culinary: 'Eaten fresh, in fruit salads, smoothies, and even grilled or in gazpacho.'
    },
    kiwi: {
      nutrition: 'Kiwis are packed with vitamin C, vitamin K, vitamin E, folate, and potassium.',
      benefits: 'They support immune function, aid digestion, and may improve sleep quality.',
      varieties: 'Common varieties include Hayward (green), Golden, and Kiwi Berries.',
      storage: 'Ripen at room temperature, then refrigerate for up to 2 weeks.',
      origin: 'Kiwifruit originated in China and was known as Chinese gooseberry.',
      season: 'Winter to spring (November to May) in most regions.',
      culinary: 'Eaten fresh, in fruit salads, smoothies, and as a garnish for desserts.'
    },
    avocado: {
      nutrition: 'Avocados are rich in healthy fats, fiber, potassium, and various vitamins and minerals.',
      benefits: 'They support heart health, aid in nutrient absorption, and may help with weight management.',
      varieties: 'Popular varieties include Hass, Fuerte, Bacon, and Zutano.',
      storage: 'Ripen at room temperature, then refrigerate ripe avocados for 2-3 days.',
      origin: 'Avocados originated in south-central Mexico about 10,000 years ago.',
      season: 'Available year-round, but peak season is January to March for Hass varieties.',
      culinary: 'In guacamole, on toast, in salads, sushi, and even in some desserts.'
    },
    blueberry: {
      nutrition: 'Blueberries are rich in antioxidants, vitamin K, vitamin C, and manganese.',
      benefits: 'They may improve brain function, heart health, and have anti-aging properties.',
      varieties: 'Common varieties include Highbush, Lowbush (wild), and Rabbiteye.',
      storage: 'Store in the refrigerator for up to 10 days. Do not wash until ready to eat.',
      origin: 'Blueberries are native to North America, where they have been consumed for thousands of years.',
      season: 'Peak season is June to August in most regions.',
      culinary: 'Eaten fresh, in muffins, pancakes, smoothies, jams, and desserts.'
    },
    peach: {
      nutrition: 'Peaches contain vitamins A, C, E, and K, as well as potassium and fiber.',
      benefits: 'They may support digestion, skin health, and have anti-inflammatory properties.',
      varieties: 'Types include Freestone, Clingstone, Donut, and White or Yellow flesh varieties.',
      storage: 'Ripen at room temperature, then refrigerate for up to 5 days.',
      origin: 'Peaches originated in China, where they have been cultivated for thousands of years.',
      season: 'Summer months (June to September) with peak in July and August.',
      culinary: 'Eaten fresh, in pies, cobblers, jams, and even grilled or in salads.'
    },
    pear: {
      nutrition: 'Pears are high in fiber, vitamin C, vitamin K, and copper.',
      benefits: 'They support digestive health, heart health, and may help with weight management.',
      varieties: 'Common varieties include Bartlett, Anjou, Bosc, and Asian pears.',
      storage: 'Ripen at room temperature, then refrigerate for up to a week.',
      origin: 'Pears originated in China and have been cultivated for over 3,000 years.',
      season: 'Late summer through winter (August to February) depending on variety.',
      culinary: 'Eaten fresh, poached, in salads, and baked in desserts.'
    },
    cherry: {
      nutrition: 'Cherries contain vitamin C, potassium, and antioxidants like anthocyanins.',
      benefits: 'They may reduce inflammation, improve sleep, and aid in post-exercise recovery.',
      varieties: 'Types include Sweet (Bing, Rainier) and Sour/Tart (Montmorency, Morello).',
      storage: 'Store unwashed in the refrigerator for up to a week.',
      origin: 'Sweet cherries originated in Asia Minor, while sour cherries come from Europe and Asia.',
      season: 'Late spring to early summer (May to July) with a short peak season.',
      culinary: 'Eaten fresh (sweet), in pies, jams, as dried fruit, and in beverages.'
    },
    pomegranate: {
      nutrition: 'Pomegranates are rich in vitamin C, vitamin K, potassium, and antioxidants.',
      benefits: 'They may have anti-inflammatory properties, protect against heart disease and cancer.',
      varieties: 'Common varieties include Wonderful, Granada, and Early Foothill.',
      storage: 'Store whole pomegranates at room temperature for a week or refrigerated for up to 2 months.',
      origin: 'Pomegranates originated in the region from Iran to northern India.',
      season: 'Fall to early winter (September to December) in most regions.',
      culinary: 'Seeds eaten fresh, in salads, as juice, in cocktails, and as a garnish.'
    },
    papaya: {
      nutrition: 'Papayas contain vitamin C, vitamin A, folate, and the enzyme papain.',
      benefits: 'They aid digestion, may reduce inflammation, and support skin health.',
      varieties: 'Common types include Hawaiian (small), Mexican (larger), and Solo varieties.',
      storage: 'Ripen at room temperature, then refrigerate ripe papayas for up to 5 days.',
      origin: 'Papayas originated in Central America and southern Mexico.',
      season: 'Available year-round in tropical regions, with peaks varying by location.',
      culinary: 'Eaten fresh, in smoothies, salads, salsas, and as a meat tenderizer.'
    },
    lemon: {
      nutrition: 'Lemons are high in vitamin C, soluble fiber, and plant compounds.',
      benefits: 'They support immunity, digestion, skin health, and weight maintenance.',
      varieties: 'Common varieties include Eureka, Lisbon, Meyer, and Ponderosa.',
      storage: 'Store at room temperature for up to a week or refrigerated for up to a month.',
      origin: 'Lemons originated in northeast India, northern Burma, and China.',
      season: 'Available year-round with peak production in winter and spring.',
      culinary: 'Used for juice, zest, in desserts, dressings, marinades, and beverages.'
    },
  };

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (message.trim() === '') return;
    
    // Add user message to chat
    setChatHistory(prev => [...prev, { sender: 'user', text: message }]);
    
    // Process user message
    processMessage(message);
    
    // Clear input
    setMessage('');
  };

  const processMessage = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    setIsTyping(true);
    
    // Helper function to process fruit queries
    const handleFruitQuery = (fruitData, fruitName) => {
      if (lowerCaseMessage.includes('nutrition') || lowerCaseMessage.includes('nutrient')) {
        return fruitData.nutrition;
      } else if (lowerCaseMessage.includes('benefit')) {
        return fruitData.benefits;
      } else if (lowerCaseMessage.includes('varieties') || lowerCaseMessage.includes('types')) {
        return fruitData.varieties;
      } else if (lowerCaseMessage.includes('store') || lowerCaseMessage.includes('storage')) {
        return fruitData.storage;
      } else if (lowerCaseMessage.includes('origin') || lowerCaseMessage.includes('where from') || lowerCaseMessage.includes('history')) {
        return fruitData.origin;
      } else if (lowerCaseMessage.includes('season') || lowerCaseMessage.includes('when') || lowerCaseMessage.includes('available')) {
        return fruitData.season;
      } else if (lowerCaseMessage.includes('cook') || lowerCaseMessage.includes('recipe') || lowerCaseMessage.includes('eat') || lowerCaseMessage.includes('use')) {
        return fruitData.culinary;
      } else {
        return `${fruitName} - Nutrition: ${fruitData.nutrition} Benefits: ${fruitData.benefits} Origin: ${fruitData.origin} What else would you like to know about ${fruitName}?`;
      }
    };
    
    // Simulate AI thinking time
    setTimeout(() => {
      let botResponse = '';
      
      // Check for greetings
      if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hey')) {
        botResponse = "Hello! How can I help you with fruits today?";
      }
      // Check for all fruits list request
      else if ((lowerCaseMessage.includes('list') || lowerCaseMessage.includes('all')) && lowerCaseMessage.includes('fruit')) {
        botResponse = "I can provide information on the following fruits: apples, bananas, oranges, strawberries, mangoes, grapes, pineapples, watermelons, kiwis, avocados, blueberries, peaches, pears, cherries, pomegranates, papayas, and lemons. Which one would you like to learn about?";
      }
      // Check for information types
      else if (lowerCaseMessage.includes('what') && lowerCaseMessage.includes('information') && lowerCaseMessage.includes('know')) {
        botResponse = "For each fruit, I can tell you about its nutrition, health benefits, varieties, storage recommendations, origin, seasonality, and culinary uses. Just ask something like 'Tell me about apple nutrition' or 'How do I store bananas?'";
      }
      // Check for specific fruit questions
      else if (lowerCaseMessage.includes('apple')) {
        botResponse = handleFruitQuery(fruitKnowledge.apple, 'apples');
      }
      else if (lowerCaseMessage.includes('banana')) {
        botResponse = handleFruitQuery(fruitKnowledge.banana, 'bananas');
      }
      else if (lowerCaseMessage.includes('orange')) {
        botResponse = handleFruitQuery(fruitKnowledge.orange, 'oranges');
      }
      else if (lowerCaseMessage.includes('strawberry') || lowerCaseMessage.includes('strawberries')) {
        botResponse = handleFruitQuery(fruitKnowledge.strawberry, 'strawberries');
      }
      else if (lowerCaseMessage.includes('mango')) {
        botResponse = handleFruitQuery(fruitKnowledge.mango, 'mangoes');
      }
      else if (lowerCaseMessage.includes('grape') || lowerCaseMessage.includes('grapes')) {
        botResponse = handleFruitQuery(fruitKnowledge.grapes, 'grapes');
      }
      else if (lowerCaseMessage.includes('pineapple')) {
        botResponse = handleFruitQuery(fruitKnowledge.pineapple, 'pineapples');
      }
      else if (lowerCaseMessage.includes('watermelon')) {
        botResponse = handleFruitQuery(fruitKnowledge.watermelon, 'watermelons');
      }
      else if (lowerCaseMessage.includes('kiwi')) {
        botResponse = handleFruitQuery(fruitKnowledge.kiwi, 'kiwis');
      }
      else if (lowerCaseMessage.includes('avocado')) {
        botResponse = handleFruitQuery(fruitKnowledge.avocado, 'avocados');
      }
      else if (lowerCaseMessage.includes('blueberry') || lowerCaseMessage.includes('blueberries')) {
        botResponse = handleFruitQuery(fruitKnowledge.blueberry, 'blueberries');
      }
      else if (lowerCaseMessage.includes('peach')) {
        botResponse = handleFruitQuery(fruitKnowledge.peach, 'peaches');
      }
      else if (lowerCaseMessage.includes('pear')) {
        botResponse = handleFruitQuery(fruitKnowledge.pear, 'pears');
      }
      else if (lowerCaseMessage.includes('cherry') || lowerCaseMessage.includes('cherries')) {
        botResponse = handleFruitQuery(fruitKnowledge.cherry, 'cherries');
      }
      else if (lowerCaseMessage.includes('pomegranate')) {
        botResponse = handleFruitQuery(fruitKnowledge.pomegranate, 'pomegranates');
      }
      else if (lowerCaseMessage.includes('papaya')) {
        botResponse = handleFruitQuery(fruitKnowledge.papaya, 'papayas');
      }
      else if (lowerCaseMessage.includes('lemon')) {
        botResponse = handleFruitQuery(fruitKnowledge.lemon, 'lemons');
      }
      // Seasonal fruit questions
      else if (lowerCaseMessage.includes('summer') && lowerCaseMessage.includes('fruit')) {
        botResponse = "Popular summer fruits include watermelons, peaches, mangoes, cherries, strawberries, and blueberries. These are typically at their peak flavor between June and August.";
      }
      else if (lowerCaseMessage.includes('winter') && lowerCaseMessage.includes('fruit')) {
        botResponse = "Popular winter fruits include citrus fruits like oranges and lemons, kiwis, pears, and pomegranates. These fruits are typically at their peak during the winter months.";
      }
      else if (lowerCaseMessage.includes('spring') && lowerCaseMessage.includes('fruit')) {
        botResponse = "Popular spring fruits include strawberries, pineapples, mangoes, and cherries. These start to come into season during the spring months.";
      }
      else if (lowerCaseMessage.includes('fall') && lowerCaseMessage.includes('fruit')) {
        botResponse = "Popular fall fruits include apples, pears, grapes, and pomegranates. These fruits typically reach their peak during the autumn months.";
      }
      // Handle general category questions
      else if (lowerCaseMessage.includes('origin') || lowerCaseMessage.includes('where') || lowerCaseMessage.includes('from')) {
        botResponse = "Many fruits have fascinating origins! Apples originated in Central Asia, bananas in Southeast Asia, oranges in China, mangoes in India, and avocados in Mexico. Is there a specific fruit whose origin you'd like to learn about?";
      }
      else if (lowerCaseMessage.includes('season') || lowerCaseMessage.includes('seasonal')) {
        botResponse = "Different fruits have different peak seasons. Summer fruits include watermelons, peaches, and berries. Fall fruits include apples, pears, and grapes. Winter fruits include citrus and pomegranates. Spring brings strawberries and pineapples. Would you like to know about a specific fruit's season?";
      }
      else if (lowerCaseMessage.includes('cook') || lowerCaseMessage.includes('recipe') || lowerCaseMessage.includes('culinary')) {
        botResponse = "Fruits can be used in many culinary applications! They can be eaten fresh, used in desserts, added to salads, made into sauces, jams, or preserves, or even included in savory dishes. Which fruit's culinary uses would you like to learn about?";
      }
      // Handle best fruit questions
      else if (lowerCaseMessage.includes('best fruit') || lowerCaseMessage.includes('recommend') || lowerCaseMessage.includes('suggestion')) {
        botResponse = "The best fruits depend on your nutrition needs and taste preferences. Berries like strawberries and blueberries are high in antioxidants. Bananas are great for energy and potassium. Citrus fruits like oranges provide vitamin C. What specific benefits are you looking for?";
      }
      else if (lowerCaseMessage.includes('healthy') || lowerCaseMessage.includes('health')) {
        botResponse = "Most fruits are very healthy! Berries are packed with antioxidants, citrus fruits provide vitamin C, and bananas offer potassium and energy. Avocados are rich in healthy fats, while apples are great for fiber. A colorful variety of fruits ensures you get a wide range of nutrients.";
      }
      else if (lowerCaseMessage.includes('what') && lowerCaseMessage.includes('fruit')) {
        botResponse = "I can tell you about various fruits including apples, bananas, oranges, strawberries, mangoes, grapes, pineapples, watermelons, kiwis, avocados, blueberries, peaches, pears, cherries, pomegranates, papayas, and lemons. What fruit would you like to learn about?";
      }
      // Default response for unrecognized queries
      else {
        botResponse = "I'm your Fruit AI assistant! I can tell you about nutrition, benefits, varieties, storage, origin, seasonality, and culinary uses of many fruits including apples, bananas, oranges, berries, tropical fruits, and more. What would you like to know?";
      }
      
      setChatHistory(prev => [...prev, { sender: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fruit-chatbot">
      {!isOpen ? (
        <div 
          className="chat-button rounded-circle bg-primary text-white shadow" 
          onClick={toggleChat}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 999
          }}
        >
          <FaAppleAlt size={24} />
        </div>
      ) : (
        <div 
          className="chat-window border rounded shadow bg-light"
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '350px',
            height: '500px',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 999,
            overflow: 'hidden'
          }}
        >
          {/* Chat header */}
          <div 
            className="chat-header bg-primary text-white px-3 py-2 d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center">
              <FaAppleAlt size={20} className="me-2" />
              <h5 className="mb-0">Fruit AI Assistant</h5>
            </div>
            <MdClose 
              size={24} 
              style={{ cursor: 'pointer' }} 
              onClick={toggleChat}
            />
          </div>
          
          {/* Chat messages */}
          <div 
            className="chat-messages p-3 flex-grow-1"
            style={{
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            {chatHistory.map((chat, index) => (
              <div 
                key={index} 
                className={`chat-message ${chat.sender === 'user' ? 'user-message ms-auto' : 'bot-message me-auto'}`}
                style={{
                  maxWidth: '80%',
                  padding: '10px 15px',
                  borderRadius: chat.sender === 'user' ? '18px 18px 0 18px' : '18px 18px 18px 0',
                  backgroundColor: chat.sender === 'user' ? '#dcf8c6' : '#f0f0f0',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}
              >
                {chat.text}
              </div>
            ))}
            {isTyping && (
              <div 
                className="bot-message me-auto"
                style={{
                  maxWidth: '80%',
                  padding: '10px 15px',
                  borderRadius: '18px 18px 18px 0',
                  backgroundColor: '#f0f0f0',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}
              >
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messageEndRef} />
          </div>
          
          {/* Chat input */}
          <div className="chat-input-container p-3 border-top">
            <div className="d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="Ask about fruits..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                className="btn btn-primary ms-2 d-flex align-items-center justify-content-center"
                onClick={handleSend}
                disabled={!message.trim()}
              >
                <IoSend />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FruitChatBot; 