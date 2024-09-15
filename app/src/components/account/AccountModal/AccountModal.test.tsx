import React from "react";
import AccountsModal from "@/components/account/AccountModal/index";
import {renderWithProviders} from "@/helpers/test/test-utils";

describe("AccountModal", () => {
    const mockFunction = jest.fn();

    test("SNAPSHOT test for default layout", () => {
        const { asFragment } = renderWithProviders(
            <AccountsModal
                onCloseWithSession={mockFunction}
                onClose={mockFunction}
                sessionId={123}
                accounts={[]}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
