import {useState} from "react";

const Navbar: React.FC<{ activeTab: string; onTabChange: (newTab: string) => void }> = ({activeTab, onTabChange}) => {
    return (
        <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between sm:px-12 py-4 bg-white shadow sm:items-baseline w-full">
            <div className="mb-2 sm:mb-0">
                <a href="#" className="text-2xl no-underline text-grey-darkest hover:text-blue-dark">Pikorino</a>
            </div>
            <div className="flex gap-4">
                <a href="#"
                   className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2"
                   onClick={() => onTabChange('applicants')}
                >
                    Шукачі
                </a>

                <a href="#"
                   className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2"
                   onClick={() => onTabChange('vacancies')}
                >
                    Вакансії
                </a>

                <a href="#"
                   className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2"
                   onClick={() => onTabChange('contracts')}
                >
                    Договори
                </a>
                
            </div>

        </nav>

    );
};

export default Navbar;