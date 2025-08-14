import { motion } from "framer-motion";
import { useState } from "react";
import officeImg from '../../assets/office.svg';
import resourcesImg from '../../assets/resources.svg';
import materialsImg from '../../assets/materials.svg';
import goodsImg from '../../assets/goods.svg';
import stockImg from '../../assets/stock.svg';

interface NavItem {
    id: string;
    label: string;
    icon: string;
}

const navItems: NavItem[] = [
    { id: 'office', label: 'Office', icon: officeImg },
    { id: 'resources', label: 'Resources', icon: resourcesImg },
    { id: 'materials', label: 'Materials', icon: materialsImg },
    { id: 'goods', label: 'Goods', icon: goodsImg },
    { id: 'stock', label: 'Stock', icon: stockImg }
];

export default function Navigation() {
    const [activeTab, setActiveTab] = useState('office');

    return (
        <motion.div 
            className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700/50 z-50"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
            <div className="w-32 h-1 bg-white/30 rounded-full mx-auto mb-2" />
            
            <div className="flex items-center justify-around px-2 sm:px-4 py-2 sm:py-3">
                {navItems.map((item) => (
                    <motion.button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`flex flex-col items-center gap-1 p-1 sm:p-2 rounded-xl transition-all duration-200 ${
                            activeTab === item.id 
                                ? 'text-blue-400 bg-blue-500/20' 
                                : 'text-white/70 hover:text-white'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <img 
                            src={item.icon} 
                            alt={item.label}
                            className="w-5 h-5 sm:w-6 sm:h-6"
                        />
                        <span className="text-xs font-medium">{item.label}</span>
                        
                        {activeTab === item.id && (
                            <motion.div
                                className="w-1 h-1 bg-blue-400 rounded-full mt-1"
                                layoutId="activeIndicator"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", damping: 15, stiffness: 300 }}
                            />
                        )}
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
} 