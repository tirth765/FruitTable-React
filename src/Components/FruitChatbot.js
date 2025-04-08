import React, { useState, useRef, useEffect } from 'react';
import './FruitChatbot.css';

const FruitChatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your Fruit & Vegetable Assistant. I can answer questions about:\n\n1. Specific Fruits:\n   - Tell me about apple\n   - What are the benefits of banana?\n   - What is orange?\n   - What are the varieties of apple?\n   - What vitamins are in banana?\n\n2. Specific Vegetables:\n   - Tell me about carrot\n   - What are the benefits of spinach?\n   - What is broccoli?\n   - What are the varieties of carrot?\n   - What minerals are in spinach?\n\n3. Juices:\n   - What are the benefits of orange juice?\n   - Tell me about apple juice\n   - What is in carrot juice?\n   - What are the benefits of spinach juice?\n\n4. Statistics:\n   - How many types of fruits are there?\n   - How many types of vegetables are there?\n   - What are the most common fruits?\n   - What are the most common vegetables?\n\n5. General Questions:\n   - Hello/Hi\n   - Help\n   - Thank you\n\nWhat would you like to know?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const response = generateResponse(input.toLowerCase());
      setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
    }, 500);
  };

  const generateResponse = (userInput) => {
    // Check for specific question patterns
    if (userInput.includes('what are the varieties of')) {
      const item = userInput.replace('what are the varieties of', '').trim();
      if (item === 'apple') {
        return "Apple Varieties:\n- Red Delicious\n- Granny Smith\n- Fuji\n- Gala\n- Honeycrisp\n- Pink Lady\n- Golden Delicious\n- McIntosh";
      } else if (item === 'carrot') {
        return "Carrot Varieties:\n- Nantes\n- Imperator\n- Chantenay\n- Danvers\n- Baby Carrots\n- Purple Carrots\n- White Carrots";
      }
    }

    if (userInput.includes('what vitamins are in')) {
      const item = userInput.replace('what vitamins are in', '').trim();
      if (item === 'banana') {
        return "Banana contains these vitamins:\n- Vitamin B6\n- Vitamin C\n- Vitamin B12\n- Vitamin A\n- Vitamin E\n- Vitamin K";
      }
    }

    if (userInput.includes('what minerals are in')) {
      const item = userInput.replace('what minerals are in', '').trim();
      if (item === 'spinach') {
        return "Spinach contains these minerals:\n- Iron\n- Calcium\n- Magnesium\n- Potassium\n- Phosphorus\n- Zinc\n- Manganese";
      }
    }

    // Check for statistics queries
    if (userInput.includes('how many types of fruits are there')) {
      return "There are approximately 2000 types of fruits in the world. Some of the most common fruits are Apple, Banana, Orange, Mango, and Grapes.";
    }

    if (userInput.includes('how many types of vegetables are there')) {
      return "There are approximately 1000 types of vegetables in the world. Common vegetables include Potato, Tomato, Onion, Carrot, and Cabbage.";
    }

    if (userInput.includes('what are the most common fruits')) {
      return "The most common fruits are:\n1. Apple\n2. Banana\n3. Orange\n4. Mango\n5. Grapes\n6. Strawberry\n7. Watermelon\n8. Pineapple\n9. Peach\n10. Pear";
    }

    if (userInput.includes('what are the most common vegetables')) {
      return "The most common vegetables are:\n1. Potato\n2. Tomato\n3. Onion\n4. Carrot\n5. Cabbage\n6. Broccoli\n7. Spinach\n8. Lettuce\n9. Cucumber\n10. Bell Pepper";
    }

    // Check for specific fruits
    const fruits = [
      {
        name: "apple",
        response: "Apple (Malus domestica) is a Pome Fruit.\n\nNutritional Content (per 100g):\n- Calories: 52\n- Carbohydrates: 14g\n- Fiber: 2.4g\n\nVitamins & Minerals:\n- Vitamin C\n- Vitamin B6\n- Vitamin K\n- Potassium\n- Manganese\n\nHealth Benefits:\n- Rich in antioxidants\n- Supports heart health\n- Aids digestion\n- May help with weight loss\n\nPopular Varieties:\n- Red Delicious\n- Granny Smith\n- Fuji\n- Gala\n- Honeycrisp"
      },
      {
        name: "banana",
        response: "Banana (Musa acuminata) is a Tropical Fruit.\n\nNutritional Content (per 100g):\n- Calories: 89\n- Carbohydrates: 23g\n- Fiber: 2.6g\n\nVitamins & Minerals:\n- Vitamin B6\n- Vitamin C\n- Vitamin B12\n- Potassium\n- Magnesium\n\nHealth Benefits:\n- Rich in potassium\n- Good for heart health\n- Natural energy booster\n- Supports digestive health\n\nPopular Varieties:\n- Cavendish\n- Lady Finger\n- Red Banana\n- Plantain"
      },
      {
        name: "orange",
        response: "Orange (Citrus sinensis) is a Citrus Fruit.\n\nNutritional Content (per 100g):\n- Calories: 47\n- Carbohydrates: 12g\n- Fiber: 2.4g\n\nVitamins & Minerals:\n- Vitamin C\n- Vitamin A\n- Calcium\n- Potassium\n\nHealth Benefits:\n- Boosts immunity\n- Supports skin health\n- May reduce heart disease risk\n- Aids digestion\n\nPopular Varieties:\n- Navel\n- Valencia\n- Blood Orange\n- Cara Cara"
      }
    ];

    // Check for specific vegetables
    const vegetables = [
      {
        name: "carrot",
        response: "Carrot (Daucus carota) is a Root Vegetable.\n\nNutritional Content (per 100g):\n- Calories: 41\n- Carbohydrates: 10g\n- Fiber: 2.8g\n\nVitamins & Minerals:\n- Vitamin A\n- Vitamin K\n- Vitamin C\n- Potassium\n- Calcium\n\nHealth Benefits:\n- Rich in beta-carotene\n- Supports eye health\n- Good for skin health\n- May reduce cancer risk\n\nPopular Varieties:\n- Nantes\n- Imperator\n- Chantenay\n- Danvers"
      },
      {
        name: "spinach",
        response: "Spinach (Spinacia oleracea) is a Leafy Green.\n\nNutritional Content (per 100g):\n- Calories: 23\n- Carbohydrates: 3.6g\n- Fiber: 2.2g\n\nVitamins & Minerals:\n- Vitamin A\n- Vitamin C\n- Vitamin K\n- Vitamin B9\n- Iron\n- Calcium\n- Magnesium\n\nHealth Benefits:\n- Rich in iron\n- Supports bone health\n- Boosts immunity\n- Good for heart health\n\nPopular Varieties:\n- Savoy\n- Flat-leaf\n- Semi-savoy"
      },
      {
        name: "broccoli",
        response: "Broccoli (Brassica oleracea) is a Cruciferous Vegetable.\n\nNutritional Content (per 100g):\n- Calories: 34\n- Carbohydrates: 6.6g\n- Fiber: 2.6g\n\nVitamins & Minerals:\n- Vitamin C\n- Vitamin K\n- Vitamin A\n- Folate\n- Potassium\n\nHealth Benefits:\n- Rich in antioxidants\n- Supports heart health\n- May reduce cancer risk\n- Good for digestion\n\nPopular Varieties:\n- Calabrese\n- Sprouting\n- Purple Sprouting"
      }
    ];

    // Check for juice queries
    const juices = [
      {
        name: "orange juice",
        response: "Orange Juice Benefits:\n\nNutritional Value (per 100ml):\n- Calories: 45\n- Vitamin C: 50mg\n- Potassium: 200mg\n\nHealth Benefits:\n- Rich in Vitamin C\n- Boosts immunity\n- Supports heart health\n- May prevent kidney stones\n- Good for skin health\n- Aids digestion"
      },
      {
        name: "apple juice",
        response: "Apple Juice Benefits:\n\nNutritional Value (per 100ml):\n- Calories: 46\n- Vitamin C: 0.9mg\n- Potassium: 101mg\n\nHealth Benefits:\n- Rich in antioxidants\n- Supports brain health\n- May reduce cholesterol\n- Good for heart health\n- Aids digestion\n- May help with weight management"
      },
      {
        name: "carrot juice",
        response: "Carrot Juice Benefits:\n\nNutritional Value (per 100ml):\n- Calories: 39\n- Vitamin A: 835μg\n- Vitamin K: 15.5μg\n\nHealth Benefits:\n- Rich in beta-carotene\n- Supports eye health\n- Boosts immunity\n- Good for skin health\n- May reduce cancer risk\n- Supports heart health"
      },
      {
        name: "spinach juice",
        response: "Spinach Juice Benefits:\n\nNutritional Value (per 100ml):\n- Calories: 23\n- Iron: 2.7mg\n- Vitamin K: 483μg\n\nHealth Benefits:\n- Rich in iron\n- Supports bone health\n- Boosts energy levels\n- Good for digestion\n- May help with weight loss\n- Supports heart health"
      }
    ];

    // Check for matches in fruits
    for (const fruit of fruits) {
      if (userInput.includes(fruit.name)) {
        return fruit.response;
      }
    }

    // Check for matches in vegetables
    for (const vegetable of vegetables) {
      if (userInput.includes(vegetable.name)) {
        return vegetable.response;
      }
    }

    // Check for matches in juices
    for (const juice of juices) {
      if (userInput.includes(juice.name)) {
        return juice.response;
      }
    }

    // General responses
    if (userInput.includes('hello') || userInput.includes('hi')) {
      return "Hello! I can answer questions about:\n\n1. Specific Fruits:\n   - Tell me about apple\n   - What are the benefits of banana?\n   - What is orange?\n   - What are the varieties of apple?\n   - What vitamins are in banana?\n\n2. Specific Vegetables:\n   - Tell me about carrot\n   - What are the benefits of spinach?\n   - What is broccoli?\n   - What are the varieties of carrot?\n   - What minerals are in spinach?\n\n3. Juices:\n   - What are the benefits of orange juice?\n   - Tell me about apple juice\n   - What is in carrot juice?\n   - What are the benefits of spinach juice?\n\n4. Statistics:\n   - How many types of fruits are there?\n   - How many types of vegetables are there?\n   - What are the most common fruits?\n   - What are the most common vegetables?\n\n5. General Questions:\n   - Hello/Hi\n   - Help\n   - Thank you\n\nWhat would you like to know?";
    } else if (userInput.includes('thank')) {
      return "You're welcome! Feel free to ask me about any other fruits, vegetables, or juices.";
    } else if (userInput.includes('help')) {
      return "I can help you with information about:\n\n1. Specific Fruits:\n   - Tell me about apple\n   - What are the benefits of banana?\n   - What is orange?\n   - What are the varieties of apple?\n   - What vitamins are in banana?\n\n2. Specific Vegetables:\n   - Tell me about carrot\n   - What are the benefits of spinach?\n   - What is broccoli?\n   - What are the varieties of carrot?\n   - What minerals are in spinach?\n\n3. Juices:\n   - What are the benefits of orange juice?\n   - Tell me about apple juice\n   - What is in carrot juice?\n   - What are the benefits of spinach juice?\n\n4. Statistics:\n   - How many types of fruits are there?\n   - How many types of vegetables are there?\n   - What are the most common fruits?\n   - What are the most common vegetables?\n\n5. General Questions:\n   - Hello/Hi\n   - Help\n   - Thank you\n\nJust ask me about any specific item!";
    } else {
      return "I can help you with information about:\n\n1. Specific Fruits:\n   - Tell me about apple\n   - What are the benefits of banana?\n   - What is orange?\n   - What are the varieties of apple?\n   - What vitamins are in banana?\n\n2. Specific Vegetables:\n   - Tell me about carrot\n   - What are the benefits of spinach?\n   - What is broccoli?\n   - What are the varieties of carrot?\n   - What minerals are in spinach?\n\n3. Juices:\n   - What are the benefits of orange juice?\n   - Tell me about apple juice\n   - What is in carrot juice?\n   - What are the benefits of spinach juice?\n\n4. Statistics:\n   - How many types of fruits are there?\n   - How many types of vegetables are there?\n   - What are the most common fruits?\n   - What are the most common vegetables?\n\n5. General Questions:\n   - Hello/Hi\n   - Help\n   - Thank you\n\nWhat would you like to know?";
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>Fruit & Vegetable Assistant</h2>
      </div>
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me about any fruit, vegetable, or juice..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default FruitChatbot; 