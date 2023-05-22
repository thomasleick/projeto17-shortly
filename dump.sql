--
-- PostgreSQL database dump
--
-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;
SET default_tablespace = '';
SET default_table_access_method = heap;

--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE USER shortlydbuser WITH PASSWORD 'senha_ultra_secreta_do_usuario_shortlydbuser';

CREATE TABLE public.urls (
    id integer NOT NULL,
    "shortUrl" character varying NOT NULL,
    url character varying NOT NULL,
    "visitCount" integer,
    "userId" integer,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE public.urls_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--
ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;

--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--
CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "refreshToken" character varying(255)
);

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--
CREATE SEQUENCE public.users_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--
ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;

--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);

--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);

--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.urls ADD CONSTRAINT urls_pkey PRIMARY KEY (id);

--
-- Name: urls urls_shorturl_key; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.urls ADD CONSTRAINT urls_shorturl_key UNIQUE ("shortUrl");

--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.users ADD CONSTRAINT users_email_key UNIQUE (email);

--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.users ADD CONSTRAINT users_pkey PRIMARY KEY (id);

--
-- Name: urls urls_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--
ALTER TABLE ONLY public.urls ADD CONSTRAINT urls_userid_fkey FOREIGN KEY ("userId") REFERENCES public.users(id);

--
-- Name: TABLE urls; Type: ACL; Schema: public; Owner: -
--
GRANT ALL ON TABLE public.urls TO shortlydbuser;

--
-- Name: SEQUENCE urls_id_seq; Type: ACL; Schema: public; Owner: -
--
GRANT ALL ON SEQUENCE public.urls_id_seq TO shortlydbuser;

--
-- Name: TABLE users; Type: ACL; Schema: public; Owner: -
--
GRANT ALL ON TABLE public.users TO shortlydbuser;

--
-- Name: SEQUENCE users_id_seq; Type: ACL; Schema: public; Owner: -
--
GRANT ALL ON SEQUENCE public.users_id_seq TO shortlydbuser;

--
-- PostgreSQL database dump complete
--