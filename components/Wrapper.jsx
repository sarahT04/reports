import { useEffect, useState, createContext } from "react"
import { getSession, useSession } from 'next-auth/react';
import { Button, Flex, Text, Center, Box } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowLeftIcon } from '@chakra-ui/icons'
import { useRouter } from "next/router";

// TODO: PROTECTION ROUTES. IS SO HARD FOR WHAT???

export const UserIdContext = createContext();

export default function Home({ children }) {
    const router = useRouter();
    const { pathname } = router;
    const [name, setName] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        getSession().then((sess) => {
            if (sess) {
                setName(sess.user.name);
                setUserId(sess.user.id);
                setIsAdmin(sess.user.isAdmin);
            }
        });
    }, [pathname === '/'])
    
    return (
        <UserIdContext.Provider value={{ userId, isAdmin }}>
            {pathname !== '/authentication'
                ? <header style={{ paddingTop: '1rem', maxWidth: '45rem', margin: 'auto' }}>
                    <Flex justify='space-between' mb={4}>
                        <Button w="1rem" isDisabled={pathname === '/'} onClick={() => router.back()}>
                            <ArrowBackIcon />
                        </Button>
                        <Center><Text>{name}</Text></Center>
                        <Button w="1rem" isDisabled={pathname === '/'} onClick={() => router.push('/')}>
                            <ArrowLeftIcon />
                        </Button>
                    </Flex>
                </header>
                : <div style={{ height: '3rem' }}>
                    <Center><Text>Guest</Text></Center>
                </div>
            }
            <div style={{ maxWidth: '35rem', margin: 'auto' }}>
                {children}
            </div>
        </UserIdContext.Provider>
    )
}
