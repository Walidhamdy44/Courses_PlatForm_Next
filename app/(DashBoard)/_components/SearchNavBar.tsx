"use client";
import { Input } from "@/components/ui/input";
import { useDepunced } from "@/hooks/use-debunse-delay";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";

const SearchNavBar = () => {
  const [value, setValue] = useState("");
  const dep = useDepunced(value, 700);

  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const curentCategryId = searchParams.get("categryId");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathName,
        query: {
          categryId: curentCategryId,
          title: dep,
        },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );
    router.push(url);
  }, [pathName, dep, curentCategryId, router]);

  return (
    <div>
      <div className="">
        <Input
          placeholder="🔍   Search For Course"
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default SearchNavBar;
